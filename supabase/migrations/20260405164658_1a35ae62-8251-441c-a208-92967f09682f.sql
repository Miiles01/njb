
-- Role enum and user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles
CREATE POLICY "Admins can view all roles" ON public.user_roles
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles" ON public.user_roles
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Projects table
CREATE TABLE public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    subtitle_es TEXT NOT NULL DEFAULT '',
    subtitle_en TEXT NOT NULL DEFAULT '',
    subtitle_fr TEXT NOT NULL DEFAULT '',
    industry_es TEXT NOT NULL DEFAULT '',
    industry_en TEXT NOT NULL DEFAULT '',
    industry_fr TEXT NOT NULL DEFAULT '',
    role_es TEXT NOT NULL DEFAULT '',
    role_en TEXT NOT NULL DEFAULT '',
    role_fr TEXT NOT NULL DEFAULT '',
    description_es TEXT NOT NULL DEFAULT '',
    description_en TEXT NOT NULL DEFAULT '',
    description_fr TEXT NOT NULL DEFAULT '',
    strategy_es TEXT DEFAULT '',
    strategy_en TEXT DEFAULT '',
    strategy_fr TEXT DEFAULT '',
    published BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Public can read published projects
CREATE POLICY "Anyone can view published projects" ON public.projects
FOR SELECT USING (published = true);

-- Admins full access
CREATE POLICY "Admins can manage all projects" ON public.projects
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Project images table
CREATE TABLE public.project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
    image_type TEXT NOT NULL CHECK (image_type IN ('cover', 'secondary', 'gallery')),
    storage_path TEXT NOT NULL,
    alt_text TEXT DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;

-- Public read for published project images
CREATE POLICY "Anyone can view images of published projects" ON public.project_images
FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.projects WHERE id = project_id AND published = true)
);

-- Admins full access to images
CREATE POLICY "Admins can manage all project images" ON public.project_images
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

-- Storage policies
CREATE POLICY "Public can view project images" ON storage.objects
FOR SELECT USING (bucket_id = 'project-images');

CREATE POLICY "Admins can upload project images" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update project images" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete project images" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'project-images' AND public.has_role(auth.uid(), 'admin'));
