const splash = document.getElementById('splash-screen');
const splashText = document.getElementById('splash-text');
splashText.style.animation = 'splashIntro 2.5s ease-out forwards';

setTimeout(() => {
  splashText.style.fontSize = 'clamp(2rem, 6vw, 5rem)';
  splashText.textContent = 'Streaming Hub';
  splashText.classList.add('typing');
}, 2600);

setTimeout(() => {
  splash.style.opacity = '0';
  setTimeout(() => splash.remove(), 1200);
}, 7500);

const title = document.getElementById('main-title');
const text = "Streaming Hub";
title.innerHTML = text.split('').map(l => `<span>${l}</span>`).join('');
title.classList.add('wave');
document.querySelectorAll('.wave span').forEach((span, i) => {
  span.style.animationDelay = `${i * 0.12}s`;
});

const categorias = {
  'tv-assinatura': [
    {id:'netflix', name:'Netflix', desc:'Séries e filmes sob demanda.', link:'https://www.netflix.com', thumb:'https://logodix.com/logo/2210324.png'},
    {id:'prime', name:'Prime Video', desc:'Filmes e séries Amazon Prime.', link:'https://www.primevideo.com', thumb:'https://tracklist.com.br/wp-content/uploads/media/2024/10/amazon-prime-video.jpg'},
    {id:'pluto', name:'Pluto TV', desc:'Canais ao vivo gratuitos.', link:'https://pluto.tv', thumb:'https://deadline.com/wp-content/uploads/2020/01/pluto-logo.png'}
  ],
  'tv-aberta': [
    {id:'globo', name:'Globo', desc:'Canal de TV aberta.', link:'https://globoplay.globo.com', thumb:'https://gkpb.com.br/wp-content/uploads/2020/08/novo-logo-globoplay-fundo-preto.jpg'},
    {id:'sbt', name:'SBT', desc:'TV aberta.', link:'https://www.sbt.com.br', thumb:'https://grandesnomesdapropaganda.com.br/wp-content/uploads/2014/03/Logo-SBT.jpg'},
    {id:'band', name:'BAND', desc:'TV aberta.', link:'https://www.band.uol.com.br', thumb:'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Rede_Bandeirantes_logo_2011.svg/1200px-Rede_Bandeirantes_logo_2011.svg.png'},
    {id:'record', name:'Record', desc:'TV aberta.', link:'https://www.r7.com', thumb:'https://classic.exame.com/wp-content/uploads/2016/09/size_960_16_9_logo_rede_record4.jpg'},
    {id:'rede-tv', name:'Rede TV!', desc:'TV aberta.', link:'https://www.redetv.uol.com.br', thumb:'https://www.publicitarioscriativos.com/wp-content/uploads/2019/11/redetv1-768x432.png'}
  ],
  'musicas': [
    {id:'spotify', name:'Spotify', desc:'Música e podcasts.', link:'https://open.spotify.com', thumb:'https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/2024-spotify-brand-assets-media-kit.jpg'},
    {id:'amazon-music', name:'Amazon Music', desc:'Música da Amazon.', link:'https://music.amazon.com', thumb:'https://static.amazonmusic.com/dims4/default/1feffd3/2147483647/strip/true/crop/1080x608+0+236/resize/1000x563!/quality/90/?url=https%3A%2F%2Famazon-k1-prod-music2.s3.us-west-2.amazonaws.com%2Fbrightspot%2F00%2F75%2Ffce403944478b583567b6659a7a0%2Fprimary-s.jpg'},
    {id:'deezer', name:'Deezer', desc:'Streaming de música.', link:'https://www.deezer.com', thumb:'https://logos-world.net/wp-content/uploads/2021/05/Deezer-Logo.png'},
    {id:'youtube-music', name:'YouTube Music', desc:'Música e videoclipes.', link:'https://music.youtube.com', thumb:'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/YT_Music.svg/2560px-YT_Music.svg.png'},
    {id:'tidal', name:'Tidal', desc:'Streaming Hi-Fi.', link:'https://tidal.com', thumb:'https://tidal.com/_nuxt/img/logos.25178fd.jpg'}
  ]
};

function renderCategoria(id, lista) {
  const grid = document.getElementById(id);
  grid.innerHTML = '';
  if (!lista.length) { grid.innerHTML = '<div class="muted">Nenhum serviço encontrado.</div>'; return; }
  for (const svc of lista) {
    const card = document.createElement('article');
    card.className = 'card';
    const thumb = document.createElement('div');
    thumb.className = 'thumb';
    const img = document.createElement('img');
    img.src = svc.thumb;
    img.alt = svc.name + ' logo';
    thumb.appendChild(img);
    const meta = document.createElement('div');
    meta.className = 'meta';
    const h = document.createElement('h3');
    h.textContent = svc.name;
    const p = document.createElement('p');
    p.textContent = svc.desc;
    const open = document.createElement('button');
    open.className = 'open-btn';
    open.textContent = 'Abrir';
    open.addEventListener('click', () => window.open(svc.link, '_blank'));
    meta.appendChild(h);
    meta.appendChild(p);
    card.appendChild(thumb);
    card.appendChild(meta);
    card.appendChild(open);
    grid.appendChild(card);
  }
}

for (const cat in categorias) renderCategoria(cat, categorias[cat]);

const notificacoes = [
  "🎬 Hora do cinema! Veja o que está bombando na Netflix 🍿",
  "🎵 Descubra sua nova música favorita no Spotify 🎧",
  "📺 Novo episódio disponível! Corre pra assistir agora 👀",
  "🔥 Top tendências da semana — não fique de fora!",
  "💡 Dica do dia: explore os canais gratuitos na Pluto TV 📡"
];

async function mostrarNotificacaoDiaria() {
  if (!("Notification" in window)) return;

  const hoje = new Date().toLocaleDateString();
  const ultimaData = localStorage.getItem("ultimaNotificacaoData");
  const historico = JSON.parse(localStorage.getItem("historicoNotificacoes") || "[]");

  if (ultimaData === hoje) return;

  if (Notification.permission !== "granted") {
    await Notification.requestPermission();
  }

  if (Notification.permission === "granted") {
    const disponiveis = notificacoes.filter(n => !historico.includes(n));
    let msg;
    if (disponiveis.length === 0) {
      msg = notificacoes[Math.floor(Math.random() * notificacoes.length)];
      localStorage.setItem("historicoNotificacoes", JSON.stringify([]));
    } else {
      msg = disponiveis[Math.floor(Math.random() * disponiveis.length)];
      historico.push(msg);
      if (historico.length > notificacoes.length - 1) historico.shift();
      localStorage.setItem("historicoNotificacoes", JSON.stringify(historico));
    }

    new Notification("📢 Streaming Hub", {
      body: msg,
      icon: "https://cdn-icons-png.flaticon.com/512/609/609803.png"
    });

    localStorage.setItem("ultimaNotificacaoData", hoje);
  }
}

mostrarNotificacaoDiaria();
