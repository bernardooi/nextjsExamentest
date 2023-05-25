import Navbar from "@/components/Navbar";

export default function HomePage() {



  
    return (
      <>
        <Navbar />


      <div className="NTI-backdrop"></div>
      <div className="NTI-background">

        <div className="about-cont">
            <h1 className="about-text">NTI Examensräknare</h1>
            <br /><br />
            <h4 className="about-text">
                Detta examensarbete är en användarvänlig webbplats som lärare kan användra för att beräkna examensgrad. Målet var att skapa ett bekvämt verktyg genom att kombinera lättanvänd design och algoritmer för spara lärares tid.
                <br /><br />
                NTI Examensräknare vill ge lärare en bekväm och effektiv plattform som de kan använda för att registrera och beräkna examensgrad baserat på inlämnad studentdata. Webbplatsen kommer att erbjuda ett användarvänligt gränssnitt där lärare laddar upp CSV-filer med betygen från deras elever.
                <br /><br />
                När CSV-filerna har laddats upp kommer webbplatsen att använda sin algoritm för att beräkna sannolikheten för examen. Denna algoritm tar hänsyn till olika faktorer som kurskrav och kurspoäng för att generera ett korrekt resultat. Lärare kommer att kunna se dessa sannolikheter för enskilda elever eller omfattande rapporter för hela klassen.
            </h4>
       </div>
      </div>

    </>

  );
}
