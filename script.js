const recommendationsByMood = {
  entspannt: [
    {
      title: "Lichter am See",
      description: "Sanfte Bilder und ruhige Geschichten für einen gelassenen Abend.",
      link: "https://www.youtube.com/results?search_query=entspannende+doku+natur"
    },
    {
      title: "Leiser Sonntag",
      description: "Eine entspannte Auswahl mit warmem Tempo und wenig Drama.",
      link: "https://www.youtube.com/results?search_query=ruhige+serien+empfehlung"
    },
    {
      title: "Sternenfenster",
      description: "Perfekt zum Abschalten, Durchatmen und einfach treiben lassen.",
      link: "https://www.youtube.com/results?search_query=weltraum+doku+deutsch"
    }
  ],
  bastellaune: [
    {
      title: "Studio Chaos",
      description: "Kreative Ideen, kleine Projekte und direkt Lust aufs Selbermachen.",
      link: "https://www.youtube.com/results?search_query=maker+projekt+deutsch"
    },
    {
      title: "Papier & Funken",
      description: "Bunte Inspiration mit einfachen DIY-Momenten für zwischendurch.",
      link: "https://www.youtube.com/results?search_query=diy+ideen+deutsch"
    },
    {
      title: "Werkbank Geschichten",
      description: "Handgemachte Formate für alle, die gleich loslegen wollen.",
      link: "https://www.youtube.com/results?search_query=technik+basteln+projekt"
    }
  ],
  muede: [
    {
      title: "Wolkenweich",
      description: "Leichte Unterhaltung mit ruhigem Rhythmus und wenig Kopfarbeit.",
      link: "https://www.youtube.com/results?search_query=ruhige+videos+zum+einschlafen"
    },
    {
      title: "Halbschlafkino",
      description: "Ideal, wenn du nur noch schauen willst, ohne viel nachzudenken.",
      link: "https://www.youtube.com/results?search_query=leichte+unterhaltung+deutsch"
    },
    {
      title: "Nachtlicht",
      description: "Angenehme Empfehlungen für einen entspannten Ausklang.",
      link: "https://www.youtube.com/results?search_query=abendprogramm+entspannt"
    }
  ],
  berieseln: [
    {
      title: "Dauerlauf Deluxe",
      description: "Einfach anschalten und laufen lassen, ohne aktiv auswählen zu müssen.",
      link: "https://www.youtube.com/results?search_query=live+stream+hintergrund+deutsch"
    },
    {
      title: "Nebenbei TV",
      description: "Locker, leicht und perfekt für den Hintergrund geeignet.",
      link: "https://www.youtube.com/results?search_query=hintergrundvideo+deutsch"
    },
    {
      title: "Kanal 23",
      description: "Unkomplizierte Empfehlungen für genau den richtigen Flow.",
      link: "https://www.youtube.com/results?search_query=easy+watch+deutsch"
    }
  ]
};

const moodDetails = {
  entspannt: {
    heading: "Für deinen entspannten Moment",
    note: "Zurücklehnen. Durchatmen. Der Rest kann warten.",
    row: 0
  },
  bastellaune: {
    heading: "Für deinen nächsten Geistesblitz",
    note: "Werkbank an, Kopf aus? Na gut – ein bisschen mitdenken darfst du.",
    row: 1
  },
  muede: {
    heading: "Für deinen gemütlichen Ausklang",
    note: "Mach’s dir weich. Heute musst du gar nichts mehr.",
    row: 2
  },
  berieseln: {
    heading: "Zum Anschalten und Abschalten",
    note: "Ich such was aus. Du kümmerst dich ums Sofa.",
    row: 3
  }
};

const moodButtons = document.querySelectorAll(".mood-button");
const recommendationList = document.getElementById("recommendation-list");
const recommendationStatus = document.getElementById("recommendation-status");
const recommendationHeading = document.getElementById("recommendations-heading");
const ginaNote = document.getElementById("gina-note");

function createRecommendationCard(item, index, row) {
  const card = document.createElement("article");
  card.className = "recommendation-card";

  const artwork = document.createElement("div");
  artwork.className = "card-art";
  artwork.setAttribute("aria-hidden", "true");
  artwork.style.setProperty("--art-x", `${index * 50}%`);
  artwork.style.setProperty("--art-y", `${row * 100 / 3}%`);

  const body = document.createElement("div");
  body.className = "card-body";
  const title = document.createElement("h3");
  title.textContent = item.title;
  const description = document.createElement("p");
  description.className = "card-description";
  description.textContent = item.description;

  const link = document.createElement("a");
  link.className = "recommendation-link";
  link.href = item.link;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.setAttribute("aria-label", `${item.title}: auf YouTube entdecken (neuer Tab)`);
  link.innerHTML = '<svg viewBox="0 0 28 24" fill="none" aria-hidden="true"><rect x="1.5" y="2.5" width="25" height="19" rx="5"/><path d="m11 7 8 5-8 5Z"/></svg><span>Auf YouTube entdecken</span><svg class="link-arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';

  body.append(title, description, link);
  card.append(artwork, body);
  return card;
}

function renderRecommendations(mood) {
  const details = moodDetails[mood];
  if (!details) return;

  const recommendations = recommendationsByMood[mood];
  const cards = recommendations.map((item, index) => createRecommendationCard(item, index, details.row));
  recommendationList.replaceChildren(...cards);
  recommendationHeading.textContent = details.heading;
  ginaNote.textContent = details.note;
  moodButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.mood === mood));
  });

  const selectedButton = [...moodButtons].find((button) => button.dataset.mood === mood);
  const label = selectedButton.querySelector("span").textContent;
  const statusMood = document.createElement("span");
  statusMood.className = "sr-only";
  statusMood.textContent = ` – ${label}`;
  recommendationStatus.replaceChildren(`${recommendations.length} Ideen für YouTube`, statusMood);
}

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.getAttribute("aria-pressed") !== "true") {
      renderRecommendations(button.dataset.mood);
    }
  });
});

renderRecommendations("entspannt");
