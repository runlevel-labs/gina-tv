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

const moodButtons = document.querySelectorAll(".mood-button");
const recommendationList = document.getElementById("recommendation-list");
const recommendationStatus = document.getElementById("recommendation-status");

function createRecommendationCard(item) {
  return `
    <article class="recommendation-card">
      <span class="card-label">Empfehlung</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <a class="recommendation-link" href="${item.link}" target="_blank" rel="noopener noreferrer">
        Auf YouTube ansehen
      </a>
    </article>
  `;
}

function renderRecommendations(mood) {
  const recommendations = recommendationsByMood[mood] || [];
  recommendationList.innerHTML = recommendations.map(createRecommendationCard).join("");
  return recommendations.length;
}

moodButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedMood = button.dataset.mood;
    const label = button.textContent.trim();
    const count = renderRecommendations(selectedMood);

    moodButtons.forEach((entry) => {
      entry.classList.toggle("is-active", entry === button);
    });

    recommendationStatus.textContent = `${count} Empfehlungen für: ${label}`;
  });
});
