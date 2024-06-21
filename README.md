![image](https://github.com/driezie/user-experience-enhanced-website/assets/80174866/6843c50d-7093-4830-a946-803156d70587)

# Tumi Mundo
<!-- Geef je project een titel en schrijf in één zin wat het is -->

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Wiki navigatie
- [1. Analyse 🔎](https://github.com/driezie/user-experience-enhanced-website/wiki/1.-Analyse-%F0%9F%94%8E)
- [2. Ontwerpen ✏️](https://github.com/driezie/user-experience-enhanced-website/wiki/2.-Ontwerpen-%E2%9C%8F%EF%B8%8F)
- [3. Bouwen 🛠️](https://github.com/driezie/user-experience-enhanced-website/wiki/3.-Bouwen-%F0%9F%9B%A0%EF%B8%8F)
- [4. Testen 🧪](https://github.com/driezie/user-experience-enhanced-website/wiki/4.-Testen-%F0%9F%A7%AA)
- [5. Integreren 📈](https://github.com/driezie/user-experience-enhanced-website/wiki/5.-Integreren-%F0%9F%93%88)
- [Werklog 📅](https://github.com/driezie/user-experience-enhanced-website/wiki/Werklog-%F0%9F%93%85)

## Beschrijving

# Doel van deze opdracht
Je leert hoe je een interactieve website kan ontwerpen en maken die je met client-side scripting kan verrijken.

Met Progressive Enhancement kun je er voor zorgen dat een website het altijd doet. Eerst bouw je de Core Functionality in HTML, zo nodig met server-side rendering. De content layer. Zodat je website het in de meest eenvoudige vorm goed doet. Daarna voeg je CSS toe voor de Presentation Layer. Tot slot voeg je extra enhancements toe om de User Experience te verbeteren.

We zijn met het hele team van Tumi Mundo samen gaan zitten om te bespreken met wat we gaan doen.

### User story:
> Als gebruiker wil ik een playlist als favoriet willen opslaan

We hebben met de vorige sprint de heart functionaliteit gemaakt. Deze functionaliteit willen we **enhancen**. Ik heb al nagedacht wat ik wil voor zorgen dat er gebeurd dat als de website javascript uit heeft staan dat hij de pagina reload als je erop drukt, je een melding krijgt of dit gelukt is of niet, de pagina **NIET RELOAD** als javascript aan staat en je op de heart icon drukt.

Deze functionaliteit doe ik allemaal via client-side Javascript. Door middel van *FETCH* stop ik de default functie van de formulier van het posten van de data. Hierbij heeft school een link voor het fetchen van data doorgestuurd [Bekijk hier MDN FETCH](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

> Hints: pak het submit events van de form

Op deze functionaliteit wil ik de layout van de pagina uitgebreid verbeteren zodat het een mooie layout heeft en een goeie functionaliteit.

Al mijn progress zal ik zetten in mijn [werklog (elke dag update)]() en bekijk hier mijn [Project board]()

## Criteria
_Definitions of done_

Deze opdracht is done als:

- [ ] Je hebt een website ontworpen en gemaakt met Node, Express en EJS en een REST API
- [ ] Je website is online gepubliceerd
- [ ] Je hebt je proces bijgehouden in de Wiki
- [ ] Je toont aan dat je in de analysefase verschillende methoden en technieken hebt ingezet om te inventariseren wat er moet gebeuren
- [ ] Je toont aan dat je in de ontwerpfase verschillende methoden en technieken hebt ingezet die ervoor zorgen dat je precies weet wat je moet bouwen
- [ ] Je toont aan dat je in de bouwfase verschillende server-side en client-side methoden en technieken hebt ingezet om het ontwerp te realiseren
- [ ] Je toont aan dat je in de testfase verschillende methoden en technieken hebt ingezet om te testen of jouw website voldoet aan standaarden en gebruiksvriendelijk is
- [ ] Je hebt client-side Javascript gebruikt om de interface te verrijken

<!-- Bij Beschrijving staat kort beschreven wat voor project het is en wat je hebt gemaakt -->
<!-- Voeg een mooie poster visual toe 📸 -->
<!-- Voeg een link toe naar Github Pages 🌐-->

## Gebruik
Op de pagina kan je alle playlists zien. Hierzin zitten er allemaal verschillende stories op. 
<!-- Bij Gebruik staat de user story, hoe het werkt en wat je er mee kan. -->

## Kenmerken
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->

## Installatie
<!-- Bij Instalatie staat hoe een andere developer aan jouw repo kan werken -->

- **Stap 1**
Om de github te clonen moet je het volgende doen:
```git
git clone https://github.com/driezie/connect-your-tribe-profile-card.git
```

- **Stap 2**
Navigate naar je folder waarin je dit hebt gepushed door middel van:
```git
cd connect-your-tribe-profile-card
```

- **Stap 3**
Instaleer node.js voor dit project als je dat nog niet had gedaan:
```git
install node.js
```

- **Stap 3**
```git
npm install vercel
```

- **Stap 4**

```git
vercel dev
```

## Bronnen
[Mijn wiki](https://github.com/driezie/user-experience-enhanced-website/wiki)
[docs/INSTRUCTIONS.md](https://github.com/driezie/user-experience-enhanced-website/blob/main/docs/INSTRUCTIONS.md)
[Github - fdnd-agency](https://github.com/fdnd-agency)
[Github - fdnd-agency - Tumi Mundo]([https://github.com/fdnd-agency](https://github.com/fdnd-agency/tumi-mundo))

## Licentie
This project is licensed under the terms of the [MIT license](./LICENSE).
