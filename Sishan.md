# ResumeCraft Development Log

## 2025-12-13

### Dashboard Login & Rate Limiting

#### 1. User Dashboard & Authentication
- **Global Auth Modal** (`src/components/auth/AuthModal.tsx`)
  - Login/Signup tabs
  - Persistent session management with Supabase Auth
  - Redirects to `/dashboard` upon login
- **Protected Routes**
  - Saving requires login
  - Importing requires login
- **User Dashboard** (`src/app/dashboard/page.tsx`)
  - Lists all user resumes
  - Edit / Delete / Duplicate actions
  - "Create New" flow integration

#### 2. Import Rate Limiting
- **Rate Limit Window**: 2 imports per 5 minutes
- **Server Action** (`src/actions/imports.ts`)
  - Checks `import_logs` table for recent activity
  - Returns remaining quota and reset time
- **UI Feedback** (`ResumeChoiceModal.tsx`)
  - Displays live countdown: "Limit 2/5 min"
  - Shows "X remaining" or "resets at HH:MM"
  - Prevents abuse while preserving friendly UX

#### 3. Profile Photo Handling
- **Architecture**: Client-side Base64 encoding
- **Storage**: Stored directly in `resumes` table JSONB column (no external bucket needed)
- **Sync**: Automatically synced across all user devices via cloud database

## 2025-12-12

### AI-Powered CV Import Feature

#### 1. Gemini AI Resume Parsing
- **Server Action** (`src/lib/import/ai-parser.ts`)
  - Uses `gemini-2.5-flash` model (best free tier: 10-15 RPM, ~1,500 RPD)
  - Secure server-side API calls (API key not exposed to client)
  - Native JSON output with `responseMimeType: "application/json"`
  - Extracts all sections: header, contact, profile, skills, languages, experience, education, projects, certifications, awards, volunteer, publications, interests

#### 2. PDF & DOCX Text Extraction
- **PDF Parser** (`src/lib/import/pdf-parser.ts`) - Uses `pdfjs-dist` with CDN worker
- **DOCX Parser** (`src/lib/import/docx-parser.ts`) - Uses `mammoth` library
- **Regex Fallback** (`src/lib/import/resume-extractor.ts`) - Backup if AI fails

#### 3. Resume Creation Choice Modal
- **Component** (`src/components/resume/ResumeChoiceModal.tsx`)
- Shows on `/create-resume` page load with two options:
  - ✨ "Start from Scratch" (recommended, with badge)
  - 📄 "Import Existing Resume" (PDF/DOCX upload)

#### 4. Homepage Template Gallery
- **View Templates button** scrolls to gallery section
- **Template Gallery** displays all templates with real previews
- Uses sample data (`src/lib/sample-data.ts`) for realistic previews
- Scaled-down A4 templates (35% scale, first page only)
- Hover overlay with "Use This Template →" CTA
- Each card links to `/create-resume`

#### 5. Template Preview Cards
- **Component** (`src/components/resume/TemplatePreviewCard.tsx`)
- Used in both homepage gallery and create-resume template selector
- Shows actual rendered templates at 14% scale (create-resume) / 35% scale (homepage)
- Clips to first page only

#### 6. PDF Export Feature
- **Export Library** (`src/lib/export/pdf.ts`)
  - Uses `html-to-image` to capture resume as high-quality PNG
  - Uses `jsPDF` to generate proper A4-sized PDF
  - Handles single and multi-page resumes
  - Removes shadows during capture for clean output
  - 2x pixel ratio for sharp text
- **Export Button** (`src/components/resume/ExportButtons.tsx`)
  - "Download PDF" button with loading state
  - Targets `#resume-print-area` element


#### Files Created:
| File | Purpose |
|------|---------|
| `src/lib/import/ai-parser.ts` | Gemini AI resume parsing (Server Action) |
| `src/lib/import/pdf-parser.ts` | PDF text extraction with pdfjs-dist |
| `src/lib/import/docx-parser.ts` | DOCX text extraction with mammoth |
| `src/lib/import/resume-extractor.ts` | Regex-based fallback parser |
| `src/lib/import/index.ts` | Import barrel file |
| `src/lib/export/pdf.ts` | PDF export using html-to-image + jsPDF |
| `src/lib/export/index.ts` | Export barrel file |
| `src/components/resume/ExportButtons.tsx` | PDF download button component |
| `src/components/resume/ResumeChoiceModal.tsx` | Creation method choice modal |
| `src/components/resume/TemplatePreviewCard.tsx` | Template preview card component |
| `src/lib/sample-data.ts` | Sample resume data for previews |

#### Files Modified:
| File | Changes |
|------|---------|
| `src/app/create-resume/page.tsx` | Added modal, template preview cards, removed ImportButton |
| `src/app/page.tsx` | Added template gallery section, scroll-to-templates button |
| `next.config.ts` | Added webpack config for pdfjs-dist |
| `.env.local` | Added `GEMINI_API_KEY` (server-side) |

#### Dependencies Added:
```json
"@google/generative-ai": "^0.x.x",
"pdfjs-dist": "^5.4.449",
"mammoth": "^1.x.x",
"html-to-image": "^1.x.x",
"jspdf": "^2.x.x"
```

#### Environment Variables:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

---

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
- [x] Implement save to database
- [x] Add authentication pages (login/signup)
- [x] Dashboard for managing multiple resumes
- [ ] More template designs
- [ ] Mobile responsive optimizations

