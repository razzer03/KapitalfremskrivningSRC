//De forskellige variabler, som bliver brugt i koden, defineres til at starte med.
let startbelob;
let rente;
let indskudPrTermin;
let aar;
let terminerPrAar;
let knap;
let kapital;
let investering;

//Koden i "setup()" køres 1 gang, når programmet startes.
function setup() {
  //Canvas tegnes og farves gråt.
  createCanvas(windowWidth, windowHeight);
  background(114, 188, 212);

  //Tekst og tekstfelter på siden oprettes. Først laves overskriften:
  textSize(24);
  textAlign(CENTER);
  textStyle(BOLD);
  text("Velkommen til Rasmus' kapitalfremskrivnings beregner!", width/2, 60);

  //Så laves de fem inputfelter med tilhørende tekst. Værdien af inputfelterne gemmes i de respektive variabler:
  textSize(16);
  text("Angiv først startkapital.", width/2, 120)
  text("kr.", width/2+100, 150)
  startbelob = createInput("5000");
  startbelob.position(width/2-90, 135);

  text("Angiv nu renten pr. år.", width/2, 190)
  text("%", width/2+100, 220)
  rente = createInput("7")
  rente.position(width/2-90, 205);

  
  text("Angiv indskud pr. termin.", width/2, 260)
  text("kr.", width/2+100, 290)
  indskudPrTermin = createInput("500")
  indskudPrTermin.position(width/2-90, 275);
  

  text("Angiv antal år", width/2, 330)
  text("år", width/2+100, 360)
  aar = createInput("5")
  aar.position(width/2-90, 345);

  
  text("Angiv terminer pr. år.", width/2, 400)
  text("terminer", width/2+125, 430)
  terminerPrAar = createInput("12")
  terminerPrAar.position(width/2-90, 415);
  

  //Knappen til at beregne kapitalen laves. Til dette bruges et library kaldet "p5.clickable", da "button" i P5's eget library har problemer i øjeblikket.
  knap = new Clickable();
  knap.color = "#c66445";
  knap.text = "Beregn!";
  knap.width = 90;
  knap.height = 30;
  knap.strokeWeight = 0;
  knap.locate(width/2-45, 460);

  //Når man trykker på knappen, så kører den følgende funktion:
  knap.onPress = function(){
    //Bunden af canvas renses for tekst, ved at placere et rektangel øverst i samme farve som baggrunden.
    noStroke();
    fill(114, 188, 212);
    rect(0, 500, width, height);

    //Når canvas er blevet renset, så sættes fill til 0, som er sort, så teksten kan ses.
    fill(0);

    //Værdien fra inputfeltet "startbelob" konverteres til et integer, og sættes ind i "kapital" og "investering" variablerne. Beregningen af kapital udføres, med antallet af terminer som n-værdi.
    kapital = int(startbelob.value());
    investering = int(startbelob.value());
    beregning(aar.value()*terminerPrAar.value());
  }
}

//Funktionen "beregning(n)" bliver brugt til at beregne kapitalfremskrivningen rekursivt.
function beregning(n) {
  //Det første funktionen gør, er at tjekke, om der står noget i alle felterne, og om disse værdier er tal. Det gøres med en if-løkke.
  //Hvis inputtet er ugyldigt, så bedes man indtaste gyldige talværdier.
  if (isNaN(startbelob.value()) || isNaN(rente.value()) || isNaN(indskudPrTermin.value()) ||isNaN(aar.value()) || isNaN(terminerPrAar.value()) || startbelob.value() == "" || rente.value() == "" || indskudPrTermin.value() == "" || aar.value() == "" || terminerPrAar.value() == "") {
    text("Udfyld felterne og/eller angiv gyldige numeriske værdier.", height/2, 530);
  }
  //Hvis alle inputs er gyldige, så køres if-løkken med den rekursive funktion.
  else{
  //Hvis n er lig med nul, så er funktionen færdig med at køre og den vil stoppe med at kalde sig selv.
    if (n==0) {
      //Knappens navn ændres, så det er tydeligt, man kan trykke på den igen.
      knap.text = "Ny beregning!";

      //Tekstens størrelse og tykkelse defineres.
      textSize(20);
      textStyle(BOLD);

      //Kapitalen efter x antal år, det løbende indskud pr. termin samt terminer pr. år og det samlede beløb, man har investeret, skrives i bunden af siden ved brug af "text()"
      text("Tillykke!", width/2, 530);
      text("Efter " + aar.value() + " år vil du have " + round(kapital,2) + " kr., når renten er " + rente.value() + " procent pr. år.", width/2, 560);
      text("Dit løbende indskud er " + indskudPrTermin.value() + " kr. pr. termin, og der er " + terminerPrAar.value() + " terminer pr. år.", width/2, 590);
      text("Samlet vil du have investeret " + investering + " kr. og fået profit på " + round(kapital - investering,2) + " kr.", width/2, 620);

      //Løkken returnerer 1, hvilket får det rekursive kald til at stoppe, da funktionen "beregning(n)" ikke kaldes igen.
      return 1;
    } 
    //Hvis n har en anden værdi end 0, så køres følgende kode:
    else {
      //"kapital" starter med at være det samme som "startbelob", som f.eks. kunne være 1000. Vi antager, at "indskudPrTermin" er 500, og "terminerPrAar" er 12. 
      //Følgende regnestykke tager de 1000 og lægger (1000 + 500) * renten i decimal tal / 12 + 500 til.
      //Hvis renten er 0.1 (10%), så vil den nye "kapital" værdi være 1000 + 1500 + 12,5 + 500 = 3012,5.
      //Når funktionen kaldes igen, så vil regnestykket nu være 3012,5 + (3012,5 + 500) * 0.1 / 12 + 500, og sådan fortsætter det, indtil n bliver 0.
      kapital += (kapital + int(indskudPrTermin.value())) * ( int(rente.value()) / 100 / int(terminerPrAar.value())) + int(indskudPrTermin.value());

      //"investering" starter ligesom "kapital" med at være lig "startbeløb". Hver gang funktionen kører, så lægges det årlige indskud til "investering".
      investering += int(indskudPrTermin.value());

      //Værdien af "kapital" skrives i konsollen, så man kan observere de forskellige udregninger.
      console.log(kapital);
      console.log(int(indskudPrTermin.value()));

      //Nu sker det unikke, nemlig det rekursive kald. Funktionen kalder nu sig selv, men hvor n-værdien er 1 mindre. 
      //Funktionen vil kalde sig selv for sidste gang, når n er lig med 1, da funktionen så bliver kaldt med en n-værdi på 0, som udfører koder i if-løkken "if (n==0)".
      return beregning(n-1)
    }
  }
}

//"p5.clickable" kræver, at knappen tegnes i function draw(), for at den kan blive vist.
function draw() {
  knap.draw();
}
