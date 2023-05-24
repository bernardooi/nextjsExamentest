import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>

      <Navbar></Navbar>

      <div className="NTI-backdrop"></div>
      <div className="NTI-background">

        <div id="home-select">
            <span className="btn-span">
                <div className="home-btn home1"><a className="home-btn-text" href="/register">Register</a><div className="btn-circle"></div></div>
            </span>
            <span className="btn-span">
                <div className="home-btn home2"><a className="home-btn-text" href="/list">View List</a><div className="btn-circle"></div></div>
            </span>
            <span className="btn-span">
                <div className="home-btn home3"><a className="home-btn-text" href="/about">About</a><div className="btn-circle"></div></div>
            </span>
            <span className="btn-span">
                <div className="home-btn home4"><a className="home-btn-text" href="/credits">Credits</a><div className="btn-circle"></div></div>
            </span>

            
            <div className="triangle-box">
                <div className="triangle"></div>
            </div>
        </div>

      </div>

    </>

  );
}
