import Hero from '../sections/Hero';
import About from './About';
import Skills from '../sections/Skills';
// The user asked for "Technical Projects" as a separate page.
// Maybe Home should just have Hero, About, Skills, and maybe a CTA to projects.
// The original Projects component might be redundant now. The user said "Merge all technical projects into a single 'Technical Projects' section".
// So I should probably NOT show the old Projects component on Home, or maybe show a preview?
// I'll stick to Hero, About, Skills for now.

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Skills />
        </>
    );
};

export default Home;
