import './Home.css'

function Home() {
  return (
    <section className="home" id="home">
      <video
        className="video-background"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
    </section>
  );
}

export default Home;