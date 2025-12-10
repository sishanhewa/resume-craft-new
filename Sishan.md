# ResumeCraft Development Log

## 2025-12-11

### Major Features Implemented

#### 1. Multi-Template System
- **Template Registry** (`src/components/resume/templates/index.ts`)
  - Centralized template registration with metadata
  - Sidebar configuration per template (width, color, position)
- **Professional Template** - Dark navy sidebar (#2c3e50)
- **Executive Template** - Light minimalist design with gray sidebar (#fafafa)

#### 2. Optional Resume Sections
Added 8 new optional sections to `ResumeContent`:
- Projects, Certifications, Awards, Volunteer Experience
- Publications, Interests, Portfolio, Custom Sections
- Each section can be added/removed dynamically via UI

#### 3. Split-Screen Layout
- **Desktop**: Form on left (60%), Live preview on right (40%)
- **Mobile**: Toggle between Form view and Preview view
- Responsive design with `useMediaQuery` hook

#### 4. A4 Page Sizing & Pagination
- **Global Page Logic** in `PaginatedResume` component
- A4 dimensions: 794×1123px at 96 DPI
- Visual page breaks with shadows and page numbers
- Sidebar background renders on EVERY page automatically
- Content-based pagination (pages only added when content overflows)

#### 5. Global Template Architecture
Templates only define content - page mechanics are global:
```ts
// Adding a new template is now simple:
myTemplate: {
    id: "myTemplate",
    name: "My Template",
    description: "...",
    component: MyTemplateComponent,
    sidebar: {
        width: 280,
        color: "#2c3e50",
        position: "left",
    },
}
```

#### Files Created/Modified:
| File | Status | Purpose |
|------|--------|---------|
| `src/components/resume/templates/types.ts` | Modified | Added `SidebarConfig` type |
| `src/components/resume/templates/index.ts` | Modified | Template registry with sidebar config |
| `src/components/resume/A4PageContainer.tsx` | New | Global pagination & A4 page rendering |
| `src/components/resume/OptionalSectionsForm.tsx` | New | Form for 8 optional sections |
| `src/components/resume/templates/executive/*` | New | Executive template components |
| `src/components/resume/templates/professional/*` | Modified | Added optional sections |
| `src/app/create-resume/page.tsx` | Modified | Split-screen layout |

---

## 2025-12-10

### Resume Form & Preview Feature

**Objective:** Create a resume creation page with a form to enter details and preview the generated CV using a professional template style.

#### What was implemented:

1. **Updated Resume Types** (`src/types/resume.ts`)
   - New types: `HeaderInfo`, `ContactInfo`, `Language`, `Reference`
   - Updated `ResumeContent` to include all template sections
   - Added `createEmptyResumeContent()` helper function

2. **Created Resume Form Component** (`src/components/resume/ResumeForm.tsx`)
   - Multi-section accordion form with collapsible sections
   - Sections: Header, Contact, Profile/Summary, Skills, Languages, Work Experience, Education, Reference
   - Dynamic list management (add/remove skills, languages, experience entries, etc.)
   - Photo upload with base64 encoding for preview
   - Responsive grid layouts

3. **Created Resume Preview Component** (`src/components/resume/ResumePreview.tsx`)
   - Styled to match the provided template with dark navy sidebar (#2c3e50)
   - Left sidebar: Profile photo, name, job title, contact info, skills, languages, reference
   - Right main area: Profile summary, work experience, education
   - Professional typography and layout

4. **Created Create Resume Page** (`src/app/create-resume/page.tsx`)
   - Toggle between Edit and Preview modes
   - State management for resume data
   - Navigation back to homepage

5. **Added Textarea Component** (`src/components/ui/textarea.tsx`)
   - shadcn-style textarea for multi-line inputs

6. **Created Supabase Schema** (`supabase-schema.sql`)
   - `resumes` table with id, user_id, title, content (JSONB), timestamps
   - Auto-update trigger for `updated_at`
   - RLS policies for CRUD operations (users can only access their own resumes)

7. **Updated Navigation**
   - Homepage "Start Building" button now links to `/create-resume`
   - Added `/create-resume` to middleware's allowed public routes

#### SQL Schema for Supabase:
```sql
-- Create resumes table
CREATE TABLE resumes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Resume',
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS Policies
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own resumes" ON resumes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own resumes" ON resumes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resumes" ON resumes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own resumes" ON resumes FOR DELETE USING (auth.uid() = user_id);
```

---

## Next Steps
- [ ] Add PDF export functionality
- [ ] Implement save to database
- [ ] Add authentication pages (login/signup)
- [ ] Dashboard for managing multiple resumes
- [ ] More template designs

