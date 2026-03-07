'use client';

import { useMemo, useState } from 'react';

const sections = [
  'understanding-the-goal',
  'preparing-the-computer',
  'installing-required-tools',
  'creating-the-website-project',
  'understanding-the-project-structure',
  'adding-website-code',
  'running-the-website-locally',
  'testing-before-deployment',
  'creating-the-production-build',
  'version-control-with-git',
  'publishing-the-code-to-github',
  'deploying-to-a-linux-server',
  'verifying-the-website-is-live',
  'troubleshooting-common-issues',
  'beginner-tips',
  'glossary-of-terms',
  'final-deployment-checklist',
];

const titles = {
  'understanding-the-goal': '1. Understanding the Goal',
  'preparing-the-computer': '2. Preparing the Computer',
  'installing-required-tools': '3. Installing Required Tools',
  'creating-the-website-project': '4. Creating the Website Project',
  'understanding-the-project-structure': '5. Understanding the Project Structure',
  'adding-website-code': '6. Adding Website Code',
  'running-the-website-locally': '7. Running the Website Locally',
  'testing-before-deployment': '8. Testing Before Deployment',
  'creating-the-production-build': '9. Creating the Production Build',
  'version-control-with-git': '10. Version Control with Git',
  'publishing-the-code-to-github': '11. Publishing the Code to GitHub',
  'deploying-to-a-linux-server': '12. Deploying to a Linux Server',
  'verifying-the-website-is-live': '13. Verifying the Website Is Live',
  'troubleshooting-common-issues': '14. Troubleshooting Common Issues',
  'beginner-tips': '15. Beginner Tips',
  'glossary-of-terms': '16. Glossary of Terms',
  'final-deployment-checklist': '17. Final Deployment Checklist',
};

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="rounded-lg border border-sky-400/30 bg-slate-800/70 px-3 py-1.5 text-xs font-medium text-sky-300 transition hover:border-sky-300/60 hover:text-sky-200"
      type="button"
    >
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function CodeBlock({ code, language = 'bash', title }) {
  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950/90 shadow-lg shadow-slate-950/30">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div>
          {title ? <p className="text-sm font-semibold text-slate-200">{title}</p> : null}
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{language}</p>
        </div>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-7 text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Callout({ title, children, tone = 'tip' }) {
  const styles = {
    tip: 'border-sky-500/30 bg-sky-500/10 text-sky-50',
    warning: 'border-amber-500/30 bg-amber-500/10 text-amber-50',
    success: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-50',
  };

  return (
    <div className={`my-5 rounded-2xl border px-5 py-4 ${styles[tone]}`}>
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em]">{title}</p>
      <div className="space-y-2 text-sm leading-7 text-slate-200">{children}</div>
    </div>
  );
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-3xl border border-slate-800 bg-slate-900/55 p-6 md:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">{title}</h2>
      <div className="mt-5 space-y-4 text-[15px] leading-8 text-slate-300">{children}</div>
    </section>
  );
}

function DiagramCard({ title, children }) {
  return (
    <div className="my-6 rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">{title}</p>
      {children}
    </div>
  );
}

export default function WebsiteSuccessGuidePage() {
  const toc = useMemo(
    () =>
      sections.map((id) => ({
        id,
        title: titles[id],
      })),
    []
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:self-start">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">Guide Navigation</p>
              <nav className="mt-4 max-h-[70vh] space-y-1 overflow-y-auto pr-2 text-sm">
                {toc.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block rounded-xl px-3 py-2 text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    {item.title}
                  </a>
                ))}
              </nav>
              <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <p className="text-sm font-semibold text-white">Download this guide as PDF</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Open the page in your browser and use the button below. Your browser will open a print window where you can save the page as a PDF.
                </p>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                  ⬇ Download this Guide as PDF
                </button>
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            <header className="overflow-hidden rounded-[2rem] border border-slate-800 bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_34%),linear-gradient(180deg,rgba(15,23,42,1),rgba(2,6,23,1))] p-8 md:p-10">
              <div className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
                Modern Web Publishing Guide
              </div>
              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">
                From Zero to Website Success
              </h1>
              <p className="mt-4 max-w-3xl text-lg text-slate-300 md:text-xl">
                A Beginner-Friendly Step-by-Step Guide to Building, Testing, and Publishing a Modern Website
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-400">Author: Richard Gamarra</p>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <p className="text-sm font-semibold text-white">Who this is for</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    People publishing their first website and anyone who wants a simple, repeatable workflow using Next.js, Node.js, GitHub, and a Linux server.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <p className="text-sm font-semibold text-white">What you will learn</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    How to prepare your computer, create the project, test locally, build for production, upload your code, and publish it online.
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                  <p className="text-sm font-semibold text-white">What success looks like</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Your site opens correctly on your own computer first, then opens from a live web address on the internet.
                  </p>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#understanding-the-goal"
                  className="inline-flex items-center rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                  Start Reading
                </a>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center rounded-xl border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-slate-500 hover:bg-slate-800"
                >
                  ⬇ Download this Guide as PDF
                </button>
              </div>
            </header>

            <DiagramCard title="Architecture Diagram: Developer to Live Website">
              <div className="grid gap-4 md:grid-cols-5">
                {[
                  ['Developer Computer', 'You write and edit the website files on your computer.'],
                  ['Local Next.js App', 'You run the site locally so you can see your work before publishing.'],
                  ['Git Repository', 'Git tracks your changes so you can save versions safely.'],
                  ['GitHub', 'GitHub stores the project online and makes publishing easier.'],
                  ['Linux Server', 'The server hosts the final site so people can reach it online.'],
                ].map(([label, desc], idx) => (
                  <div key={label} className="relative rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sm font-bold text-sky-300">
                      {idx + 1}
                    </div>
                    <p className="font-semibold text-white">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{desc}</p>
                    {idx < 4 ? (
                      <div className="hidden md:block absolute -right-5 top-1/2 h-0.5 w-8 -translate-y-1/2 bg-sky-400/40" />
                    ) : null}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm leading-7 text-slate-400">
                Think of the process like this: you build on your computer, test it safely, store the project in GitHub, then place the final version on a Linux server so the public can visit it.
              </p>
            </DiagramCard>

            <Section id="understanding-the-goal" title={titles['understanding-the-goal']}>
              <p>
                A website usually starts on your own computer. That first version is called <strong className="text-white">local development</strong>. It is private and safe. Only you can see it unless you share your screen or computer.
              </p>
              <p>
                A live website is different. That version runs on a server connected to the internet. When people open your domain name or web address, they are visiting the server version, not the copy on your laptop.
              </p>
              <p>
                Your goal is to move through five simple stages: create the project, add content, test it locally, prepare a production build, and publish it on a server.
              </p>
              <DiagramCard title="Simple Workflow">
                <div className="grid gap-3 md:grid-cols-5">
                  {['Plan', 'Build', 'Test', 'Deploy', 'Verify'].map((step) => (
                    <div key={step} className="rounded-2xl border border-slate-800 bg-slate-900 px-4 py-5 text-center font-semibold text-slate-200">
                      {step}
                    </div>
                  ))}
                </div>
              </DiagramCard>
              <Callout title="Beginner Analogy" tone="tip">
                <p>
                  Think of local development like cooking in your kitchen. You taste the food, fix it, and improve it. Publishing is like serving that meal in a restaurant where other people can finally enjoy it.
                </p>
              </Callout>
            </Section>

            <Section id="preparing-the-computer" title={titles['preparing-the-computer']}>
              <p>
                Before you create a website project, your computer needs a few basic tools. These tools do different jobs, but together they make the workflow smooth and repeatable.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ['Terminal', 'A place where you type commands to control tools and projects.'],
                  ['Code Editor', 'A program such as Visual Studio Code that lets you edit project files comfortably.'],
                  ['Internet Connection', 'Needed for downloading tools, packages, and connecting to GitHub or your server.'],
                  ['A Project Folder', 'A clean folder where your website files will live.'],
                ].map(([tool, desc]) => (
                  <div key={tool} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <p className="font-semibold text-white">{tool}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{desc}</p>
                  </div>
                ))}
              </div>
              <Callout title="Why preparation matters" tone="warning">
                <p>
                  Most beginner problems happen before the website even starts. Missing tools, wrong folders, or commands run in the wrong place can cause confusion. Good preparation prevents those issues.
                </p>
              </Callout>
            </Section>

            <Section id="installing-required-tools" title={titles['installing-required-tools']}>
              <p>
                The most common beginner-friendly modern stack for this workflow uses <strong className="text-white">Node.js</strong>, <strong className="text-white">npm</strong>, <strong className="text-white">Git</strong>, and <strong className="text-white">Next.js</strong>.
              </p>
              <ul className="list-disc space-y-2 pl-6 text-slate-300 marker:text-sky-300">
                <li><strong className="text-white">Node.js</strong> runs JavaScript tools on your computer.</li>
                <li><strong className="text-white">npm</strong> installs packages your project needs.</li>
                <li><strong className="text-white">Git</strong> tracks changes in your files.</li>
                <li><strong className="text-white">Next.js</strong> helps you build a modern website using React.</li>
              </ul>
              <CodeBlock
                title="Check whether Node.js and Git are installed"
                code={`node -v\nnpm -v\ngit --version`}
              />
              <p>
                Run these commands in your terminal. If version numbers appear, the tools are installed. If your terminal says the command is not found, install the missing tool first.
              </p>
              <Callout title="Success check" tone="success">
                <p>
                  A good result looks like version numbers such as <code className="rounded bg-slate-800 px-1.5 py-1 text-slate-100">v22.x.x</code> for Node.js or <code className="rounded bg-slate-800 px-1.5 py-1 text-slate-100">git version 2.x.x</code> for Git.
                </p>
              </Callout>
            </Section>

            <Section id="creating-the-website-project" title={titles['creating-the-website-project']}>
              <p>
                Once the tools are ready, you create a new Next.js website project. This command builds the basic structure for you.
              </p>
              <CodeBlock
                title="Create a new Next.js project"
                code={`npx create-next-app@latest website-project`}
              />
              <p>
                Run this command in the folder where you want the new project to be created. The folder name at the end, <code className="rounded bg-slate-800 px-1.5 py-1 text-slate-100">website-project</code>, can be replaced with your own project name.
              </p>
              <CodeBlock
                title="Go into the project folder"
                code={`cd website-project`}
              />
              <p>
                This second command moves your terminal into the project. That matters because most future commands must be run from inside this folder.
              </p>
            </Section>

            <Section id="understanding-the-project-structure" title={titles['understanding-the-project-structure']}>
              <p>
                A project folder contains many files. Do not let that intimidate you. You only need to understand the purpose of the important ones.
              </p>
              <DiagramCard title="Common Next.js Folder Structure">
                <CodeBlock
                  language="text"
                  code={`website-project/\n├── app/\n│   └── page.jsx\n├── public/\n├── node_modules/\n├── package.json\n└── next.config.js`}
                />
              </DiagramCard>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ['app/', 'This usually holds the pages and route files for your site.'],
                  ['page.jsx', 'This is often the main page the visitor sees first.'],
                  ['public/', 'A place for static files such as images, icons, and downloadable documents.'],
                  ['node_modules/', 'This stores installed packages. You usually do not edit it by hand.'],
                  ['package.json', 'A small control file that lists project information, scripts, and dependencies.'],
                  ['next.config.js', 'An optional settings file for Next.js behavior.'],
                ].map(([name, desc]) => (
                  <div key={name} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <p className="font-semibold text-white">{name}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="adding-website-code" title={titles['adding-website-code']}>
              <p>
                After the project exists, you replace the starter content with your own page. In many projects, this means editing or replacing <code className="rounded bg-slate-800 px-1.5 py-1 text-slate-100">app/page.jsx</code>.
              </p>
              <CodeBlock
                title="Example path to the main page file"
                code={`website-project/app/page.jsx`}
                language="text"
              />
              <p>
                Open that file in your code editor, remove the sample content, and paste in your own page code. Save the file after you finish.
              </p>
              <Callout title="Important" tone="warning">
                <p>
                  Always make sure you are editing the file inside the correct project folder. Many beginners accidentally edit a different copy of the file and then wonder why the website does not change.
                </p>
              </Callout>
            </Section>

            <Section id="running-the-website-locally" title={titles['running-the-website-locally']}>
              <p>
                Running the site locally lets you preview your work before anyone else sees it. This is one of the most important steps in the whole workflow.
              </p>
              <CodeBlock title="Start the local development server" code={`npm run dev`} />
              <p>
                Run this command from inside your project folder. It starts the Next.js development server. After a few seconds, your terminal usually shows a local address.
              </p>
              <CodeBlock title="Typical local address" code={`http://localhost:3000`} language="text" />
              <p>
                Open that address in your browser. If the page loads and shows your content, the local test is working.
              </p>
              <Callout title="What success looks like" tone="success">
                <p>
                  The page opens in your browser, your new content appears, and the terminal stays running without major errors. While the terminal is running, Next.js watches for changes and refreshes the page when you save files.
                </p>
              </Callout>
            </Section>

            <Section id="testing-before-deployment" title={titles['testing-before-deployment']}>
              <p>
                Before publishing, test the site carefully. This saves time later and prevents broken pages from reaching your server.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  'Does the homepage load?',
                  'Do headings and text appear correctly?',
                  'Do links open where they should?',
                  'Do buttons work?',
                  'Does the site look correct on desktop and mobile?',
                  'Are there obvious spelling mistakes?',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
                    ✔ {item}
                  </div>
                ))}
              </div>
              <p>
                Testing locally is cheaper and safer than testing on a live server. Fix problems now, not after deployment.
              </p>
            </Section>

            <Section id="creating-the-production-build" title={titles['creating-the-production-build']}>
              <p>
                A production build is the optimized version of your website. It is prepared for speed, stability, and deployment.
              </p>
              <CodeBlock title="Create the production build" code={`npm run build`} />
              <p>
                Run this command from inside the project folder. If the build succeeds, Next.js has confirmed that the project is in good enough shape to prepare for deployment.
              </p>
              <Callout title="Why this matters" tone="tip">
                <p>
                  A page may look fine during development but still fail during build. The build step helps catch those hidden issues before the site goes live.
                </p>
              </Callout>
            </Section>

            <Section id="version-control-with-git" title={titles['version-control-with-git']}>
              <p>
                Git tracks changes in your project like a detailed history log. If something breaks, Git helps you understand what changed and when.
              </p>
              <CodeBlock
                title="Initialize Git and create your first commit"
                code={`git init\ngit add .\ngit commit -m "Initial commit"`}
              />
              <p>
                <strong className="text-white">git init</strong> starts version control in the folder. <strong className="text-white">git add .</strong> stages your files. <strong className="text-white">git commit</strong> saves a version snapshot with a message.
              </p>
            </Section>

            <Section id="publishing-the-code-to-github" title={titles['publishing-the-code-to-github']}>
              <p>
                GitHub is an online home for your Git repository. It stores your project in the cloud and makes collaboration, backup, and deployment easier.
              </p>
              <CodeBlock
                title="Connect your project to GitHub"
                code={`git branch -M main\ngit remote add origin https://github.com/your-username/your-repo.git\ngit push -u origin main`}
              />
              <p>
                Replace the sample repository address with your own GitHub repository URL. When you push successfully, your code appears on GitHub.
              </p>
              <Callout title="About GitHub tokens" tone="tip">
                <p>
                  GitHub may ask you to authenticate with a personal access token instead of a password. A token is like a secure app password made especially for GitHub actions.
                </p>
              </Callout>
            </Section>

            <Section id="deploying-to-a-linux-server" title={titles['deploying-to-a-linux-server']}>
              <p>
                A Linux server is the computer that will host your website on the internet. A common deployment path might look like this:
              </p>
              <CodeBlock title="Example deployment folder" code={`/var/www/website-project`} language="text" />
              <p>
                In simple terms, <code className="rounded bg-slate-800 px-1.5 py-1 text-slate-100">/var</code> is a system folder, <code className="rounded bg-slate-800 px-1.5 py-1 text-slate-100">/www</code> is often used for website files, and <code className="rounded bg-slate-800 px-1.5 py-1 text-slate-100">website-project</code> is your project folder on the server.
              </p>
              <CodeBlock
                title="Typical deployment flow"
                language="text"
                code={`Write Code\n   │\nRun Locally\n   │\nTest\n   │\nBuild Production Version\n   │\nPush to GitHub\n   │\nDeploy to Server\n   │\nWebsite Live`}
              />
              <p>
                Your exact deployment method can vary. Some people pull the code from GitHub on the server. Others upload files manually or use a deployment service. The core idea stays the same: the final website files must reach the Linux server and be served correctly.
              </p>
            </Section>

            <Section id="verifying-the-website-is-live" title={titles['verifying-the-website-is-live']}>
              <p>
                After deployment, open your real site address in a browser. Check that the homepage loads, the design looks right, and the newest changes appear.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  'Open the live URL in a browser',
                  'Refresh the page to confirm new changes are visible',
                  'Test the site from another device if possible',
                  'Make sure links, buttons, and images work',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
                    ✔ {item}
                  </div>
                ))}
              </div>
              <Callout title="You did it" tone="success">
                <p>
                  If your site loads online and shows the changes you expected, you have completed the full journey from local development to live publishing.
                </p>
              </Callout>
            </Section>

            <Section id="troubleshooting-common-issues" title={titles['troubleshooting-common-issues']}>
              <div className="space-y-4">
                {[
                  ['Command not found', 'The tool is not installed or is not available in your terminal path.', 'Install the missing tool or restart your terminal after installation.'],
                  ['npm install fails', 'A package download or dependency setup problem happened.', 'Read the error lines carefully, check internet access, and run the command again.'],
                  ['localhost does not open', 'The dev server may not be running or may be using a different port.', 'Check the terminal output and confirm the server started successfully.'],
                  ['Git authentication error', 'GitHub did not accept your login.', 'Use the correct username and a valid personal access token if required.'],
                  ['Build failure', 'Your project has a code or configuration problem that the production build detected.', 'Read the build error, fix the file it mentions, then run npm run build again.'],
                  ['Server permission issue', 'The server account may not have permission to read or write website files.', 'Check folder ownership, permissions, and the deployment user being used.'],
                ].map(([issue, meaning, fix]) => (
                  <div key={issue} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                    <p className="font-semibold text-white">{issue}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400"><strong className="text-slate-200">What it means:</strong> {meaning}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400"><strong className="text-slate-200">How to fix it:</strong> {fix}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="beginner-tips" title={titles['beginner-tips']}>
              <ul className="list-disc space-y-3 pl-6 text-slate-300 marker:text-sky-300">
                <li>Run commands slowly and one at a time. Rushing causes avoidable mistakes.</li>
                <li>Read the current folder path in your terminal before running commands.</li>
                <li>Save files before checking the browser for changes.</li>
                <li>Keep your project name simple and avoid spaces in folder names.</li>
                <li>When an error appears, read the first helpful line before trying random fixes.</li>
                <li>Use Git often so you always have a safe checkpoint.</li>
              </ul>
            </Section>

            <Section id="glossary-of-terms" title={titles['glossary-of-terms']}>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  ['Repository', 'A project folder tracked by Git.'],
                  ['Deployment', 'The act of publishing the website to a server.'],
                  ['Server', 'A computer that hosts the live website online.'],
                  ['Node.js', 'Software that runs JavaScript tools on your computer.'],
                  ['npm', 'A package manager that installs project dependencies.'],
                  ['Git', 'A version control tool that tracks file changes.'],
                  ['GitHub', 'An online service that stores Git repositories.'],
                  ['localhost', 'A local address used to view a site on your own computer.'],
                  ['Production build', 'An optimized version of your site for real deployment.'],
                  ['Next.js', 'A React framework used to build modern websites and apps.'],
                ].map(([term, desc]) => (
                  <div key={term} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                    <p className="font-semibold text-white">{term}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-400">{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="final-deployment-checklist" title={titles['final-deployment-checklist']}>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  'Node.js, npm, and Git are installed',
                  'The Next.js project was created successfully',
                  'You added your own code to the project',
                  'The website opened locally in the browser',
                  'You tested the page and fixed visible issues',
                  'The production build completed successfully',
                  'Git was initialized and a commit was created',
                  'The code was pushed to GitHub',
                  'The project was deployed to a Linux server',
                  'The live site opened correctly online',
                ].map((item) => (
                  <label key={item} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4 text-sm text-slate-300">
                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-sky-400" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
              <p>
                Once every item above is complete, your workflow is no longer just an experiment. It is a repeatable system you can use again for future website projects.
              </p>
            </Section>
          </div>
        </div>
      </div>
    </main>
  );
}
