import Navbar from "@/components/Navbar";

export default function HomePage() {
  return (
    <>

      <Navbar></Navbar>


      <div className="NTI-backdrop"></div>
      <div className="NTI-background">

        <div className="about-cont">
            <h1 className="about-text">NTI Examensgrad</h1>
            <br /><br />
            <h4 className="about-text">
                Detta examensarbete är en användarvänlig webbplats som lärare kan användra för att beräkna examensgrad. Målet var att skapa ett bekvämt verktyg genom att kombinera lättanvänd design och algoritmer för spara lärares tid.
                <br /><br />
                NTI Examensgrad vill ge lärare en bekväm och effektiv plattform somde kan använda för att registrera och beräkna examensgrad baserat på inlämnad studentdata. Webbplatsen kommer att erbjuda ett användarvänligt gränssnitt där lärare kan ladda upp CSV-filer som innehåller betygen från deras elever.
                <br /><br />
                När CSV-filerna har laddats upp kommer webbplatsen att använda sina inbyggda algoritmer och formler för att beräkna sannolikheten för examen. Dessa algoritmer kommer att ta hänsyn till olika faktorer som kurskrav och kurspoäng för att generera korrekta resultat. Lärare kommer att kunna se dessa sannolikheter för enskilda elever eller generera omfattande rapporter för hela klassen.
            </h4>
       </div>
      </div>

    </>

  );
}
