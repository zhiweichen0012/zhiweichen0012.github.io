# Zhiwei Chen — Academic Homepage

A bilingual, responsive academic homepage designed for GitHub Pages. The site uses
plain HTML, CSS, and JavaScript, so there is no build step and no framework
dependency.

## Preview locally

From the project directory, run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Updating content

Routine content is stored in separate files under `content/`:

- `profile.js` — name, title, affiliation, email, and profile links
- `about.js` — biography
- `recruitment.js` — recruitment information
- `news.js` — news
- `publications.js` — publications
- `projects.js` — research projects
- `students.js` — academic team members
- `teaching.js` — courses
- `site.js` — last updated date

Each bilingual field uses `{ en: "English", zh: "中文" }`. Shared navigation and
interface labels are in `script.js`. Page structure is in `index.html`.

Students are grouped in `content/students.js` under `phd`, `master`, and
`undergraduate`. Empty groups are hidden automatically. For each student, maintain:

- `name` — bilingual name
- `level` — degree level and cohort
- `research` — bilingual research area
- `email` — email address
- `photo` — path such as `assets/students/name.jpg`
- `url` — optional personal homepage

Leave `photo`, `email`, or `url` empty when unavailable. A missing photo uses an
initials placeholder; a non-empty `url` makes the student's name a link.

Update the `lastUpdated` field in `content/site.js` whenever content changes.
The footer formats this date automatically for English and Chinese.

The site always opens in English. The language button changes the current page
only and does not store the selection.

The public section order is defined in `index.html`: recruitment, biography,
news, publications, projects, students, and teaching.

## Publish on GitHub Pages

Push these files to the `main` branch of
`zhiweichen0012/zhiweichen0012.github.io`. For a user-site repository with this
name, GitHub Pages normally publishes from the branch root automatically. If it is
not enabled, select **Settings → Pages → Deploy from a branch → main / (root)**.

The included `CNAME` keeps the existing custom domain `zwchen.tech`. Confirm that
the domain's DNS records still point to GitHub Pages after publishing.
