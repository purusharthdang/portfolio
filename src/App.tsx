import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Briefcase,
  GraduationCap,
  Layout,
  Github,
  Linkedin,
  Mail
} from 'lucide-react';
import { Scene } from '@/components/Scene';
import { ProjectCarousel } from '@/components/ProjectCarousel';
import { ContactForm } from '@/components/ContactForm';

// TODO: Replace with your profile data
const projects = [
  {
    title: 'AI Research assistant',
    description: 'AI powered research assistant built using OpenAPI and React',
    demoUrl: 'https://ai-assistant-five-beige.vercel.app',
  },
  {
    title: 'Weather Assistant App',
    description: 'Intuitive weather app to show current and forecasted weather',
    demoUrl: 'https://weather-assistant-beige.vercel.app/',
  },
  {
    title: 'Music streaming analytics with Streamify',
    description: 'Music analytics with a made simple using data visualisation.',
    demoUrl: 'https://streamify-gold.vercel.app/',
  },
  {
    title: 'Appointment booking calendar app',
    description: 'Make appointments easy',
    demoUrl: 'https://main--bespoke-baklava-c50b2a.netlify.app/',
  }
];

// TODO: Replace with your experience data
const experience = [
  {
    title: 'Senior Frontend Engineer',
    company: 'Proqio (Encardio Rite Electronics)',
    period: 'May 2023 - Present',
    achievements: [
      'Developed interactive dashboards using Highcharts for visualizing complex Proqio project data.',
      'Implemented end-to-end testing with Cypress, ensuring robust automation via Git hooks using Husky.',
      'Through this role, I honed my ability to transform complex datasets into meaningful visual insights, reinforcing my technical depth in testing automation, and data - driven product design.',
      'Developed data driven dashboards using Highcharts and React-Dropzone',
      'Maintained clean, scalable, and high-quality code, and creating custom UI design system prioritizing long-term sustainability and maintainability.'
    ]
  },
  {
    title: 'Lead Frontend Engineer',
    company: 'Mentorkart',
    period: 'Dec 2021 - May 2023',
    achievements: [
      'Joined as a founding engineer, leading all frontend development efforts.',
      'Built and maintained multiple platforms, including a marketing app, student and mentor portal, job portal, and video chat application using Zoom SDK. Which increased platform retention by 40%',
      'Mentored junior developers and conducted code reviews',
      'Led a team of frontend developers, fostering a culture of growth and learning.'
    ]
  },
  {
    title: 'Frontend Engineer',
    company: 'Ibyte Informatics',
    period: 'May 2021 - Dec 2021',
    achievements: [
      'First job right after graduation, at iByte I used my time to learn the best practices and get hands-on experience on production level projects.',
      'Interacted with clients all over the world, and presented 90% of all demos myself.',
      'Built and maintained multiple platforms, like e-commerce sites and activity tracking monitors.'
    ]
  }
];

function App() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="scene-container relative">
        <Canvas
          className="touch-none"
          camera={{
            position: [0, 0, 5],
            fov: window.innerWidth < 768 ? 75 : 60
          }}
        >
          <Scene />
          <OrbitControls
            enableZoom
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
        <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 w-full px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Purusharth Dang</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">Frontend Engineer</p>
          <div className="flex gap-4 justify-center items-end">
            {/* TODO: Replace with your social links */}
            <Button variant="outline" size="icon" onClick={() => { window.open(import.meta.env.VITE_APP_GITHUB_URL) }} className="hover:bg-primary hover:text-primary-foreground">
              <Github className='h-4 w-4' />
            </Button>
            <Button variant="outline" onClick={() => { window.open(import.meta.env.VITE_APP_LINKEDIN_URL) }} size="icon" className="hover:bg-primary hover:text-primary-foreground">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <ScrollArea className="w-full">
          <div className="flex justify-center gap-2 md:gap-4 p-2 md:p-4">
            <Button variant="ghost" onClick={() => scrollTo(projectsRef)} className="flex gap-2 text-sm md:text-base">
              <Layout className="h-4 w-4" /> <span className="hidden md:inline">Projects</span>
            </Button>
            <Button variant="ghost" onClick={() => scrollTo(experienceRef)} className="flex gap-2 text-sm md:text-base">
              <Briefcase className="h-4 w-4" /> <span className="hidden md:inline">Experience</span>
            </Button>
            <Button variant="ghost" onClick={() => scrollTo(educationRef)} className="flex gap-2 text-sm md:text-base">
              <GraduationCap className="h-4 w-4" /> <span className="hidden md:inline">Education</span>
            </Button>
            <Button variant="ghost" onClick={() => scrollTo(contactRef)} className="flex gap-2 text-sm md:text-base">
              <Mail className="h-4 w-4" /> <span className="hidden md:inline">Hire me!</span>
            </Button>
          </div>
        </ScrollArea>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12 space-y-16 md:space-y-24">
        {/* Projects Section */}
        <section ref={projectsRef} className="scroll-mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-2">
            <Layout className="h-6 w-6" /> Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCarousel key={index} {...project} />
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section ref={experienceRef} className="scroll-mt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 flex items-center gap-2">
            <Briefcase className="h-6 w-6" /> Experience
          </h2>
          <div className="space-y-6">
            {experience.map((job, index) => (
              <Card key={index} className="bg-card">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl">{job.title}</CardTitle>
                  <p className="text-sm md:text-base text-muted-foreground">{job.company} • {job.period}</p>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-muted-foreground">
                    {job.achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>


        {/* Education Section */}
        <section ref={educationRef} className="scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <GraduationCap className="h-6 w-6" /> Education
          </h2>
          <Card className="bg-card">
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* TODO: Replace with your education data */}
              <div>
                <h3 className="font-semibold">Bachelor's in Computer Applications</h3>
                <p className="text-sm text-muted-foreground">Vivekananda Institute of Professional Studies • 2018 - 2021</p>
              </div>
              <div>
                <h3 className="font-semibold">Advanced React Certification</h3>
                <p className="text-sm text-muted-foreground">Udemy • 2021</p>
              </div>
              <div>
                <h3 className="font-semibold">Fundamentals of UI/UX principles by Google</h3>
                <p className="text-sm text-muted-foreground">Coursera • 2020</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="scroll-mt-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
            <Mail className="h-6 w-6" /> Hire me
          </h2>
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}

export default App;