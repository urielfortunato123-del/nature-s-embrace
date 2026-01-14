// Biblioteca Offline Completa - Fauna, Flora e Natureza Brasileira

export interface LibraryItem {
  id: string;
  title: string;
  category: 'fauna' | 'flora' | 'biomas' | 'rios' | 'aves' | 'mamiferos' | 'repteis' | 'anfibios' | 'peixes' | 'insetos' | 'conservacao' | 'legislacao';
  subcategory?: string;
  description: string;
  content: string;
  scientificName?: string;
  status?: 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX'; // IUCN status
  biome?: string[];
  image?: string;
  tags: string[];
}

export const conservationStatus = {
  LC: { label: 'Pouco Preocupante', color: '#4CAF50' },
  NT: { label: 'Quase Ameaçada', color: '#8BC34A' },
  VU: { label: 'Vulnerável', color: '#FFC107' },
  EN: { label: 'Em Perigo', color: '#FF9800' },
  CR: { label: 'Criticamente em Perigo', color: '#F44336' },
  EW: { label: 'Extinto na Natureza', color: '#9C27B0' },
  EX: { label: 'Extinto', color: '#212121' },
};

export const biomes = [
  { id: 'amazonia', name: 'Amazônia', emoji: '🌳' },
  { id: 'cerrado', name: 'Cerrado', emoji: '🌾' },
  { id: 'mata-atlantica', name: 'Mata Atlântica', emoji: '🌲' },
  { id: 'caatinga', name: 'Caatinga', emoji: '🌵' },
  { id: 'pampa', name: 'Pampa', emoji: '🌿' },
  { id: 'pantanal', name: 'Pantanal', emoji: '🐊' },
];

export const offlineLibrary: LibraryItem[] = [
  // ================== MAMÍFEROS ==================
  {
    id: 'onca-pintada',
    title: 'Onça-pintada',
    category: 'mamiferos',
    subcategory: 'Felídeos',
    scientificName: 'Panthera onca',
    status: 'VU',
    biome: ['Amazônia', 'Pantanal', 'Cerrado', 'Mata Atlântica'],
    description: 'Maior felino das Américas e terceiro maior do mundo.',
    content: `A onça-pintada (Panthera onca) é o maior felino das Américas, podendo pesar até 158 kg. É um predador de topo de cadeia alimentar, fundamental para o equilíbrio dos ecossistemas.

**Características:**
- Comprimento: 1,1 a 1,85 m (sem a cauda)
- Peso: 56 a 158 kg (machos), 41 a 100 kg (fêmeas)
- Pelagem amarelo-dourada com rosetas pretas
- Existem indivíduos melânicos (onças-pretas)

**Habitat:**
Florestas tropicais, cerrados e pantanais. Preferem áreas com acesso à água.

**Alimentação:**
Carnívora - capivaras, queixadas, veados, jacarés, tartarugas e peixes.

**Reprodução:**
- Gestação: 91-111 dias
- Ninhada: 1-4 filhotes
- Maturidade sexual: 2-3 anos

**Ameaças:**
- Perda de habitat
- Caça ilegal
- Conflitos com pecuária
- Atropelamentos

**Conservação:**
Protegida por lei no Brasil. Projetos como Onçafari e Instituto Onça-Pintada trabalham na conservação.`,
    tags: ['felino', 'predador', 'carnívoro', 'ameaçado', 'grande porte'],
  },
  {
    id: 'capivara',
    title: 'Capivara',
    category: 'mamiferos',
    subcategory: 'Roedores',
    scientificName: 'Hydrochoerus hydrochaeris',
    status: 'LC',
    biome: ['Amazônia', 'Pantanal', 'Cerrado', 'Mata Atlântica', 'Pampa'],
    description: 'Maior roedor do mundo, semi-aquático.',
    content: `A capivara é o maior roedor vivente do mundo, podendo pesar até 80 kg. São animais semi-aquáticos e gregários.

**Características:**
- Comprimento: 1,0 a 1,3 m
- Peso: 35 a 80 kg
- Pelagem marrom-avermelhada
- Patas com membranas interdigitais

**Habitat:**
Margens de rios, lagos e áreas alagadas.

**Alimentação:**
Herbívora - gramíneas aquáticas e terrestres, plantas aquáticas, frutas e cascas de árvores.

**Comportamento:**
- Vivem em grupos de 10-30 indivíduos
- Excelentes nadadoras
- Podem ficar até 5 minutos submersos
- Crepusculares e noturnas

**Reprodução:**
- Gestação: 150 dias
- Ninhada: 1-8 filhotes
- Podem ter 2 ninhadas por ano

**Importância Ecológica:**
São presas importantes para onças, jacarés e sucuris.`,
    tags: ['roedor', 'semi-aquático', 'herbívoro', 'gregário'],
  },
  {
    id: 'tamanduá-bandeira',
    title: 'Tamanduá-bandeira',
    category: 'mamiferos',
    subcategory: 'Xenartros',
    scientificName: 'Myrmecophaga tridactyla',
    status: 'VU',
    biome: ['Cerrado', 'Pantanal', 'Amazônia'],
    description: 'Maior espécie de tamanduá, especialista em formigas e cupins.',
    content: `O tamanduá-bandeira é um mamífero insetívoro único, com língua que pode atingir 60 cm de comprimento.

**Características:**
- Comprimento: até 2,2 m (incluindo cauda)
- Peso: 33 a 50 kg
- Focinho alongado e sem dentes
- Garras poderosas nas patas dianteiras
- Cauda longa e peluda (bandeira)

**Habitat:**
Cerrados, campos e bordas de florestas.

**Alimentação:**
- Formigas e cupins (até 35.000 por dia)
- Língua viscosa com 150 movimentos por minuto

**Comportamento:**
- Solitário
- Atividade diurna e noturna
- Usa cauda para se cobrir ao dormir
- Pode se defender de predadores com garras

**Ameaças:**
- Atropelamentos (principal causa de morte)
- Incêndios no Cerrado
- Perda de habitat
- Caça

**Curiosidades:**
- Não possui dentes
- Temperatura corporal baixa (33°C)
- Filhote anda nas costas da mãe por até 1 ano`,
    tags: ['xenartro', 'insetívoro', 'ameaçado', 'cerrado'],
  },
  {
    id: 'lobo-guara',
    title: 'Lobo-guará',
    category: 'mamiferos',
    subcategory: 'Canídeos',
    scientificName: 'Chrysocyon brachyurus',
    status: 'VU',
    biome: ['Cerrado', 'Pantanal'],
    description: 'Maior canídeo da América do Sul, símbolo do Cerrado.',
    content: `O lobo-guará é o maior canídeo sul-americano, conhecido por suas pernas longas e pelagem avermelhada.

**Características:**
- Altura: 75-90 cm no ombro
- Peso: 20-30 kg
- Pelagem vermelho-dourada
- Pernas longas e finas
- Orelhas grandes e eretas

**Habitat:**
Campos e cerrados abertos, com vegetação rasteira.

**Alimentação:**
Onívoro - lobeira (fruta favorita), pequenos mamíferos, aves, répteis, frutas e raízes.

**Comportamento:**
- Solitário (exceto reprodução)
- Crepuscular e noturno
- Territorial
- Comunicação por uivos e marcação de cheiro

**Reprodução:**
- Gestação: 62-66 dias
- Ninhada: 2-6 filhotes
- Monogâmicos

**Importância:**
Dispersor de sementes da lobeira (Solanum lycocarpum).

**Curiosidades:**
- Aparece na nota de R$ 200
- Cheiro forte característico (skunk do cerrado)
- Não é lobo verdadeiro nem raposa`,
    tags: ['canídeo', 'cerrado', 'ameaçado', 'onívoro'],
  },
  {
    id: 'mico-leao-dourado',
    title: 'Mico-leão-dourado',
    category: 'mamiferos',
    subcategory: 'Primatas',
    scientificName: 'Leontopithecus rosalia',
    status: 'EN',
    biome: ['Mata Atlântica'],
    description: 'Primata endêmico da Mata Atlântica, símbolo da conservação brasileira.',
    content: `O mico-leão-dourado é um pequeno primata endêmico do estado do Rio de Janeiro, símbolo da conservação no Brasil.

**Características:**
- Peso: 600-800 g
- Comprimento: 20-34 cm (corpo) + 31-40 cm (cauda)
- Pelagem dourada brilhante
- Juba ao redor da face

**Habitat:**
Mata Atlântica de baixada, florestas primárias e secundárias.

**Alimentação:**
- Frutos maduros
- Flores e néctar
- Insetos e pequenos vertebrados
- Goma de árvores

**Comportamento:**
- Grupos familiares de 2-8 indivíduos
- Dormem em ocos de árvores
- Diurnos e arborícolas
- Sistema social cooperativo

**Reprodução:**
- Gestação: 125-132 dias
- Gêmeos são comuns
- Toda família ajuda no cuidado

**Conservação:**
- Restam cerca de 3.200 indivíduos na natureza
- Programa de reintrodução bem-sucedido
- Reserva Biológica de Poço das Antas

**História:**
Quase extinto nos anos 1970, é exemplo de sucesso de conservação.`,
    tags: ['primata', 'endêmico', 'mata atlântica', 'ameaçado'],
  },
  {
    id: 'anta',
    title: 'Anta',
    category: 'mamiferos',
    subcategory: 'Perissodáctilos',
    scientificName: 'Tapirus terrestris',
    status: 'VU',
    biome: ['Amazônia', 'Pantanal', 'Cerrado', 'Mata Atlântica'],
    description: 'Maior mamífero terrestre da América do Sul.',
    content: `A anta é o maior mamífero terrestre brasileiro, podendo pesar até 300 kg. É conhecida como "jardineira da floresta".

**Características:**
- Comprimento: 1,8 a 2,5 m
- Peso: 180 a 300 kg
- Focinho em forma de pequena tromba
- Pelagem marrom-acinzentada
- Crista cervical

**Habitat:**
Florestas tropicais e subtropicais, sempre próximo à água.

**Alimentação:**
- Herbívora
- Folhas, brotos, frutos e plantas aquáticas
- Come mais de 300 espécies de plantas

**Comportamento:**
- Solitária
- Crepuscular e noturna
- Excelente nadadora
- Usa trilhas fixas

**Reprodução:**
- Gestação: 13-14 meses
- Um filhote por vez
- Filhotes com listras e pintas

**Importância Ecológica:**
Dispersora de sementes - "jardineira da floresta".

**Ameaças:**
- Caça
- Perda de habitat
- Atropelamentos`,
    tags: ['herbívoro', 'dispersor de sementes', 'grande porte'],
  },
  {
    id: 'preguica',
    title: 'Preguiça-comum',
    category: 'mamiferos',
    subcategory: 'Xenartros',
    scientificName: 'Bradypus variegatus',
    status: 'LC',
    biome: ['Amazônia', 'Mata Atlântica', 'Cerrado'],
    description: 'Mamífero arborícola de movimentos lentos.',
    content: `A preguiça é um mamífero arborícola conhecido por seus movimentos extremamente lentos e metabolismo baixo.

**Características:**
- Peso: 2,5 a 6 kg
- Comprimento: 40-75 cm
- 3 dedos com garras longas
- Pelagem com algas simbióticas
- Pescoço com 9 vértebras

**Habitat:**
Copas de árvores em florestas tropicais.

**Alimentação:**
- Folhas (principalmente de embaúba)
- Brotos e flores
- Digestão lenta (até 1 mês)

**Comportamento:**
- Dorme 15-20 horas por dia
- Desce ao solo para defecar (1x por semana)
- Excelente nadadora
- Solitária

**Reprodução:**
- Gestação: 5-6 meses
- Um filhote por vez
- Filhote fica com mãe por 6 meses

**Adaptações:**
- Metabolismo muito lento
- Pode girar a cabeça 270°
- Pelagem cresce ao contrário

**Curiosidades:**
Mariposas e besouros vivem em sua pelagem, formando ecossistema próprio.`,
    tags: ['arborícola', 'lento', 'xenartro', 'folívoro'],
  },
  {
    id: 'peixe-boi',
    title: 'Peixe-boi-da-Amazônia',
    category: 'mamiferos',
    subcategory: 'Sirênios',
    scientificName: 'Trichechus inunguis',
    status: 'VU',
    biome: ['Amazônia'],
    description: 'Único sirênio exclusivamente de água doce.',
    content: `O peixe-boi-da-Amazônia é o único sirênio que vive exclusivamente em água doce no mundo.

**Características:**
- Comprimento: 2,5 a 3 m
- Peso: 300 a 500 kg
- Coloração cinza-escura
- Mancha branca ou rosa no ventre
- Sem unhas nas nadadeiras

**Habitat:**
Rios, lagos e igapós da Amazônia.

**Alimentação:**
- Herbívoro aquático
- Come até 8% do peso por dia
- Gramíneas e plantas aquáticas

**Comportamento:**
- Pode ficar 20 min submerso
- Solitário ou pequenos grupos
- Migrações sazonais

**Reprodução:**
- Gestação: 12-14 meses
- Um filhote a cada 2-3 anos
- Amamentação por 2 anos

**Ameaças:**
- Caça para carne
- Redes de pesca
- Degradação do habitat

**Conservação:**
- Protegido desde 1967
- Projetos de reabilitação e soltura
- INPA e Instituto Mamirauá`,
    tags: ['aquático', 'herbívoro', 'ameaçado', 'amazônia'],
  },
  {
    id: 'queixada',
    title: 'Queixada',
    category: 'mamiferos',
    subcategory: 'Suídeos',
    scientificName: 'Tayassu pecari',
    status: 'VU',
    biome: ['Amazônia', 'Mata Atlântica', 'Cerrado', 'Pantanal'],
    description: 'Porco-do-mato que vive em grandes bandos.',
    content: `O queixada é um porco-do-mato que forma grandes bandos, importantes para a dinâmica florestal.

**Características:**
- Peso: 25 a 40 kg
- Comprimento: 75-110 cm
- Pelagem escura
- Mancha branca na mandíbula
- Presas afiadas

**Habitat:**
Florestas tropicais e subtropicais.

**Alimentação:**
- Onívoro
- Frutos, sementes, raízes
- Invertebrados e pequenos vertebrados

**Comportamento:**
- Bandos de 50 a 300 indivíduos
- Barulho característico dos dentes
- Cheiro forte
- Podem ser agressivos

**Reprodução:**
- Gestação: 156-162 dias
- 1-4 filhotes
- Fêmeas se separam para parir

**Importância Ecológica:**
- Revolvem o solo
- Dispersam e predam sementes
- Presas de onças

**Diferença do Cateto:**
Queixada é maior, tem barba branca e forma bandos maiores.`,
    tags: ['porco-do-mato', 'gregário', 'onívoro'],
  },
  {
    id: 'tatu-canastra',
    title: 'Tatu-canastra',
    category: 'mamiferos',
    subcategory: 'Xenartros',
    scientificName: 'Priodontes maximus',
    status: 'VU',
    biome: ['Cerrado', 'Pantanal', 'Amazônia'],
    description: 'Maior tatu do mundo, pode pesar até 60 kg.',
    content: `O tatu-canastra é o maior tatu existente, podendo atingir 1,5 m de comprimento.

**Características:**
- Comprimento: até 1,5 m (com cauda)
- Peso: 30 a 60 kg
- Carapaça com 11-13 bandas móveis
- Garras enormes (até 20 cm)
- Cauda longa

**Habitat:**
Cerrados, florestas e áreas abertas.

**Alimentação:**
- Insetívoro
- Formigas, cupins e larvas
- Pode destruir cupinzeiros inteiros

**Comportamento:**
- Noturno e solitário
- Cava tocas enormes (até 5 m)
- Território de até 20 km²

**Reprodução:**
- Gestação: 4 meses
- Um filhote por vez
- Baixa taxa reprodutiva

**Importância:**
Tocas são usadas por mais de 70 espécies.

**Ameaças:**
- Caça
- Perda de habitat
- Baixa taxa reprodutiva

**Curiosidades:**
- Pode ficar de pé nas patas traseiras
- Usa cauda como apoio
- Muito raro de ser avistado`,
    tags: ['xenartro', 'insetívoro', 'ameaçado', 'grande porte'],
  },

  // ================== AVES ==================
  {
    id: 'arara-azul',
    title: 'Arara-azul',
    category: 'aves',
    subcategory: 'Psitacídeos',
    scientificName: 'Anodorhynchus hyacinthinus',
    status: 'VU',
    biome: ['Pantanal', 'Cerrado', 'Amazônia'],
    description: 'Maior psitacídeo do mundo, com plumagem azul-cobalto.',
    content: `A arara-azul é a maior arara do mundo e uma das aves mais icônicas do Brasil.

**Características:**
- Comprimento: 98-100 cm
- Envergadura: até 1,3 m
- Peso: 1,5 a 1,7 kg
- Plumagem azul-cobalto intensa
- Anel amarelo ao redor dos olhos
- Bico negro extremamente forte

**Habitat:**
Pantanal, cerradão e matas ciliares.

**Alimentação:**
- Sementes de palmeiras (especialmente bocaiuva e acuri)
- Bico pode quebrar cocos duros

**Comportamento:**
- Monogâmicas (casais para a vida)
- Voam em casais ou pequenos grupos
- Dormem em grupos

**Reprodução:**
- Nidificam em ocos de árvores (manduvi)
- 1-2 ovos por postura
- Incubação: 28-30 dias
- Filhotes dependentes por 6 meses

**Conservação:**
- Projeto Arara Azul desde 1990
- Instalação de ninhos artificiais
- População aumentou para ~6.500

**Ameaças históricas:**
- Tráfico de animais
- Perda de habitat
- Falta de árvores para ninhos`,
    tags: ['psitacídeo', 'ameaçado', 'pantanal', 'azul'],
  },
  {
    id: 'tucano-toco',
    title: 'Tucano-toco',
    category: 'aves',
    subcategory: 'Ranfastídeos',
    scientificName: 'Ramphastos toco',
    status: 'LC',
    biome: ['Cerrado', 'Pantanal', 'Mata Atlântica'],
    description: 'Maior tucano do mundo, com bico alaranjado característico.',
    content: `O tucano-toco é a maior espécie de tucano, famoso por seu enorme bico alaranjado.

**Características:**
- Comprimento: 55-65 cm
- Peso: 500-860 g
- Bico: 15-23 cm (1/3 do corpo)
- Plumagem preta com garganta branca
- Pele azul ao redor dos olhos

**Habitat:**
Cerrados, matas ciliares e bordas de floresta.

**Alimentação:**
- Frugívoro
- Também come insetos, ovos e filhotes de outras aves
- Importante dispersor de sementes

**Comportamento:**
- Gregários (grupos de 3-12)
- Dormem em ocos apertados
- Voo ondulante característico
- Vocalizações altas

**Reprodução:**
- Nidificam em ocos de árvores
- 2-4 ovos
- Incubação: 16-18 dias
- Ambos cuidam dos filhotes

**Curiosidades:**
- Bico é oco e leve
- Usado para termorregulação
- Símbolo de cerveja brasileira

**Importância:**
Dispersor de sementes de palmeiras e outras árvores.`,
    tags: ['frugívoro', 'bico grande', 'cerrado', 'dispersor'],
  },
  {
    id: 'harpia',
    title: 'Gavião-real (Harpia)',
    category: 'aves',
    subcategory: 'Accipitrídeos',
    scientificName: 'Harpia harpyja',
    status: 'VU',
    biome: ['Amazônia', 'Mata Atlântica'],
    description: 'Maior ave de rapina das Américas.',
    content: `A harpia é a maior e mais poderosa águia das Américas, predadora de topo.

**Características:**
- Envergadura: até 2,2 m
- Peso: 4-9 kg (fêmeas maiores)
- Garras do tamanho de garras de urso
- Crista dupla característica
- Plumagem cinza e branca

**Habitat:**
Dossel de florestas tropicais primárias.

**Alimentação:**
- Preguiças (presa favorita)
- Macacos
- Cutias, quatis, tamanduás
- Aves grandes

**Comportamento:**
- Voa pelo dossel
- Pode carregar presas do próprio peso
- Ataques silenciosos e precisos

**Reprodução:**
- Ninhos enormes no topo de árvores emergentes
- 1-2 ovos (só um sobrevive geralmente)
- Ciclo reprodutivo de 3 anos
- Cuidado parental por 2 anos

**Conservação:**
- Precisa de grandes áreas de floresta
- Sensível ao desmatamento
- Programas de reintrodução em andamento

**Curiosidades:**
- Visão 8x melhor que humanos
- Garras podem exercer 42 kg de pressão
- Ave nacional do Panamá`,
    tags: ['rapinante', 'predador', 'ameaçado', 'grande porte'],
  },
  {
    id: 'beija-flor-abelha',
    title: 'Beija-flor-abelha',
    category: 'aves',
    subcategory: 'Troquilídeos',
    scientificName: 'Mellisuga helenae',
    status: 'NT',
    biome: ['Mata Atlântica'],
    description: 'Menor ave do mundo, do tamanho de uma abelha grande.',
    content: `Os beija-flores estão entre as menores aves do mundo, com espécies brasileiras fascinantes.

**Características gerais:**
- Peso: 2-20 g dependendo da espécie
- Batimento de asas: 12-80 por segundo
- Coração: 500-1.200 batimentos/minuto
- Únicos que voam para trás

**Espécies brasileiras notáveis:**
- Beija-flor-tesoura (Eupetomena macroura)
- Beija-flor-de-topete (Stephanoxis lalandi)
- Beija-flor-rubi (Clytolaema rubricauda)

**Alimentação:**
- Néctar de flores
- Pequenos insetos e aranhas
- Visitam centenas de flores por dia

**Comportamento:**
- Territoriais
- Machos fazem displays aéreos
- Entram em torpor à noite

**Reprodução:**
- Ninhos minúsculos com teia de aranha
- 2 ovos do tamanho de feijão
- Fêmea cuida sozinha

**Polinização:**
- Polinizadores essenciais
- Coevolução com flores tubulares
- Flores vermelhas e laranjas

**Curiosidades:**
- Metabolismo mais alto entre vertebrados
- Consomem metade do peso em açúcar/dia
- Língua em forma de "W"`,
    tags: ['nectarívoro', 'polinizador', 'pequeno', 'voador'],
  },
  {
    id: 'jacu',
    title: 'Jacutinga',
    category: 'aves',
    subcategory: 'Cracídeos',
    scientificName: 'Aburria jacutinga',
    status: 'EN',
    biome: ['Mata Atlântica'],
    description: 'Ave da Mata Atlântica criticamente ameaçada.',
    content: `A jacutinga é uma ave de grande porte da Mata Atlântica, importante dispersora de sementes.

**Características:**
- Comprimento: 64-74 cm
- Peso: 1,1-1,4 kg
- Plumagem preta com reflexos metálicos
- Barbela vermelha e azul
- Topete branco

**Habitat:**
Florestas primárias de Mata Atlântica.

**Alimentação:**
- Frugívora
- Palmito-juçara (fruto favorito)
- Importante dispersora de sementes

**Comportamento:**
- Arborícola
- Grupos pequenos
- Silenciosa e discreta
- Voos curtos

**Reprodução:**
- Ninhos em árvores
- 2-3 ovos
- Pouco conhecida

**Ameaças:**
- Caça histórica intensa
- Perda de habitat
- Extinção do palmito-juçara

**Conservação:**
- Menos de 5.000 indivíduos
- Programas de reintrodução
- SAVE Brasil e parceiros

**Importância:**
Dispersa sementes grandes que outras aves não conseguem.`,
    tags: ['cracídeo', 'ameaçado', 'mata atlântica', 'frugívora'],
  },
  {
    id: 'seriema',
    title: 'Seriema',
    category: 'aves',
    subcategory: 'Cariamídeos',
    scientificName: 'Cariama cristata',
    status: 'LC',
    biome: ['Cerrado', 'Caatinga', 'Pantanal'],
    description: 'Ave terrestre do cerrado, parente dos dinossauros.',
    content: `A seriema é uma ave terrestre típica do cerrado brasileiro, famosa por seu canto estridente.

**Características:**
- Altura: 75-90 cm
- Peso: 1,5-2 kg
- Plumagem cinza-amarronzada
- Crista de penas na base do bico
- Pernas longas e avermelhadas

**Habitat:**
Campos, cerrados e áreas abertas.

**Alimentação:**
- Onívora
- Insetos, cobras, lagartos
- Roedores, aves pequenas
- Mata presas batendo contra pedras

**Comportamento:**
- Terrestre (voa pouco)
- Corre até 40 km/h
- Vive em casais ou grupos familiares
- Canto territorial alto

**Reprodução:**
- Ninhos em árvores ou arbustos
- 2-3 ovos
- Ambos incubam
- Filhotes deixam ninho em 2 semanas

**Curiosidades:**
- Parente vivo mais próximo dos "aves do terror" extintas
- Canto ouvido a quilômetros
- Símbolo do cerrado

**Importância:**
Controladora de populações de serpentes.`,
    tags: ['terrestre', 'cerrado', 'predadora', 'canto alto'],
  },

  // ================== RÉPTEIS ==================
  {
    id: 'jacare-acu',
    title: 'Jacaré-açu',
    category: 'repteis',
    subcategory: 'Crocodilianos',
    scientificName: 'Melanosuchus niger',
    status: 'LC',
    biome: ['Amazônia'],
    description: 'Maior crocodiliano das Américas, pode atingir 6 metros.',
    content: `O jacaré-açu é o maior predador da Amazônia, podendo atingir 6 metros de comprimento.

**Características:**
- Comprimento: até 6 m (normalmente 4-5 m)
- Peso: até 400 kg
- Coloração negra (adultos)
- Mandíbula mais larga que longa
- Olhos e narinas no topo da cabeça

**Habitat:**
Rios, lagos e igapós amazônicos.

**Alimentação:**
- Peixes (principal)
- Capivaras, antas
- Tartarugas, aves
- Juvenis: insetos e crustáceos

**Comportamento:**
- Predominantemente noturno
- Termorregulação ao sol
- Territorialidade em machos
- Pode ficar horas submerso

**Reprodução:**
- Ninhos de vegetação
- 30-60 ovos
- Fêmea protege ovos e filhotes
- Incubação: 42-90 dias

**Conservação:**
- Quase extinto nos anos 1970 (caça de couro)
- Recuperação após proteção legal
- Manejo sustentável em algumas áreas

**Curiosidades:**
- Mais antigo que os dinossauros
- Pode viver 50-80 anos
- Vocalizações para comunicação`,
    tags: ['crocodiliano', 'predador', 'amazônia', 'grande porte'],
  },
  {
    id: 'sucuri',
    title: 'Sucuri-verde',
    category: 'repteis',
    subcategory: 'Serpentes',
    scientificName: 'Eunectes murinus',
    status: 'LC',
    biome: ['Amazônia', 'Pantanal'],
    description: 'Maior cobra do mundo em peso, pode atingir 200 kg.',
    content: `A sucuri é a cobra mais pesada do mundo, podendo atingir mais de 200 kg.

**Características:**
- Comprimento: até 9 m (comum 4-6 m)
- Peso: até 250 kg
- Coloração verde-oliva com manchas pretas
- Olhos e narinas no topo da cabeça
- Constritora (não venenosa)

**Habitat:**
Rios, pântanos e áreas alagadas.

**Alimentação:**
- Capivaras, jacarés jovens
- Veados, antas
- Peixes, aves aquáticas
- Digere presas por semanas

**Comportamento:**
- Semi-aquática
- Caçadora de emboscada
- Principalmente noturna
- Pode ficar submersa por 30 min

**Reprodução:**
- Vivípara (dá à luz filhotes)
- 20-40 filhotes por ninhada
- Acasalamento em grupos
- Fêmeas muito maiores que machos

**Curiosidades:**
- Disputa com píton reticulada pelo título de maior cobra
- Pode engolir presas maiores que sua cabeça
- Mandíbula desarticulável

**Predação:**
Adultas não têm predadores naturais (exceto humanos).`,
    tags: ['serpente', 'constritora', 'aquática', 'grande porte'],
  },
  {
    id: 'tartaruga-amazonia',
    title: 'Tartaruga-da-amazônia',
    category: 'repteis',
    subcategory: 'Quelônios',
    scientificName: 'Podocnemis expansa',
    status: 'LC',
    biome: ['Amazônia'],
    description: 'Maior tartaruga de água doce da América do Sul.',
    content: `A tartaruga-da-amazônia é a maior tartaruga de água doce da América do Sul.

**Características:**
- Comprimento: até 90 cm de casco
- Peso: até 60 kg
- Carapaça oval e achatada
- Coloração marrom-esverdeada
- Pescoço retrátil lateralmente

**Habitat:**
Grandes rios e lagos amazônicos.

**Alimentação:**
- Herbívora quando adulta
- Plantas aquáticas, frutos, flores
- Juvenis também comem invertebrados

**Comportamento:**
- Migra para praias de nidificação
- Toma sol em grupos
- Pode ficar horas submersa
- Gregária

**Reprodução:**
- Desovas em praias de areia
- 60-150 ovos por ninho
- Incubação: 45-70 dias
- Temperatura determina sexo

**Conservação:**
- Programa Quelônios da Amazônia (40+ anos)
- Manejo comunitário de praias
- Coleta de ovos controlada

**Ameaças históricas:**
- Consumo de carne e ovos
- Comércio ilegal
- Perda de praias de desova`,
    tags: ['quelônio', 'água doce', 'amazônia', 'herbívora'],
  },
  {
    id: 'iguana',
    title: 'Iguana-verde',
    category: 'repteis',
    subcategory: 'Lagartos',
    scientificName: 'Iguana iguana',
    status: 'LC',
    biome: ['Amazônia', 'Mata Atlântica', 'Cerrado'],
    description: 'Grande lagarto herbívoro arborícola.',
    content: `A iguana-verde é um dos maiores lagartos das Américas, muito comum no Brasil.

**Características:**
- Comprimento: até 2 m (incluindo cauda)
- Peso: até 8 kg
- Coloração verde (jovens) a marrom (adultos)
- Papada grande e escamas dorsais
- Cauda longa e listrada

**Habitat:**
Árvores próximas à água em florestas tropicais.

**Alimentação:**
- Herbívora
- Folhas, flores, frutos
- Juvenis podem comer insetos

**Comportamento:**
- Arborícola e excelente nadadora
- Diurna
- Territorial
- Pode soltar cauda (autotomia)

**Reprodução:**
- Ninhos em buracos no solo
- 20-70 ovos
- Incubação: 65-115 dias
- Sem cuidado parental

**Defesas:**
- Chicotadas com cauda
- Mordidas
- Unhas afiadas
- Solta-se de galhos para água

**Curiosidades:**
- Terceiro olho (órgão parietal)
- Pode cair de 15 m sem se machucar
- Popular como pet (problema ambiental)`,
    tags: ['lagarto', 'herbívoro', 'arborícola', 'grande'],
  },

  // ================== ANFÍBIOS ==================
  {
    id: 'perereca-de-vidro',
    title: 'Perereca-de-vidro',
    category: 'anfibios',
    subcategory: 'Anuros',
    scientificName: 'Vitreorana sp.',
    status: 'LC',
    biome: ['Mata Atlântica', 'Amazônia'],
    description: 'Perereca com pele transparente que permite ver órgãos internos.',
    content: `As pererecas-de-vidro são anfíbios únicos com pele translúcida no ventre.

**Características:**
- Tamanho: 2-3 cm
- Pele ventral transparente
- Órgãos internos visíveis
- Coloração verde no dorso
- Olhos grandes e proeminentes

**Habitat:**
Vegetação sobre riachos em florestas.

**Alimentação:**
- Insetívora
- Pequenos artrópodes
- Caçam à noite

**Comportamento:**
- Noturnas
- Machos vocalizam para atrair fêmeas
- Ovos depositados em folhas sobre água
- Girinos caem na água ao eclodir

**Reprodução:**
- Ovos em folhas pendentes
- Machos protegem ovos
- Girinos aquáticos
- Metamorfose em 2-3 meses

**Curiosidades:**
- Transparência como camuflagem
- Coração visível batendo
- Algumas espécies concentram hemácias no fígado

**Conservação:**
Sensíveis a mudanças ambientais - bioindicadores.`,
    tags: ['anuro', 'transparente', 'noturno', 'bioindicador'],
  },
  {
    id: 'sapo-cururu',
    title: 'Sapo-cururu',
    category: 'anfibios',
    subcategory: 'Anuros',
    scientificName: 'Rhinella marina',
    status: 'LC',
    biome: ['Amazônia', 'Cerrado', 'Mata Atlântica', 'Caatinga'],
    description: 'Maior sapo do Brasil, com glândulas de veneno.',
    content: `O sapo-cururu é o maior sapo brasileiro, conhecido por suas glândulas de veneno.

**Características:**
- Comprimento: até 25 cm
- Peso: até 1,5 kg
- Pele verrugosa
- Glândulas paratoides grandes
- Coloração marrom-acinzentada

**Habitat:**
Áreas abertas, jardins, plantações.

**Alimentação:**
- Insetívora oportunista
- Besouros, formigas, cupins
- Pequenos vertebrados
- Come quase tudo que cabe na boca

**Comportamento:**
- Noturno
- Atrai insetos com luz
- Migra para reprodução
- Tolera ambientes alterados

**Reprodução:**
- Desovas em poças e lagos
- Milhares de ovos em cordões
- Girinos venenosos
- Metamorfose em 1-2 meses

**Veneno:**
- Bufotoxinas nas glândulas
- Pode matar predadores
- Perigo para cães e gatos
- Usado tradicionalmente por indígenas

**Espécie invasora:**
Problema grave na Austrália onde foi introduzido.`,
    tags: ['anuro', 'venenoso', 'adaptável', 'grande'],
  },
  {
    id: 'dendrobates',
    title: 'Rã-ponta-de-flecha',
    category: 'anfibios',
    subcategory: 'Anuros',
    scientificName: 'Dendrobates sp.',
    status: 'VU',
    biome: ['Amazônia'],
    description: 'Pequenas rãs coloridas extremamente venenosas.',
    content: `As rãs-ponta-de-flecha são anfíbios pequenos e coloridos, conhecidos por seu veneno potente.

**Características:**
- Tamanho: 1,5-6 cm
- Cores vibrantes (aposematismo)
- Padrões de cores variados
- Diurnas (ao contrário de maioria)
- Pele lisa e brilhante

**Habitat:**
Chão de florestas tropicais úmidas.

**Alimentação:**
- Formigas, ácaros, cupins
- Dieta determina toxicidade
- Veneno vem dos alimentos

**Comportamento:**
- Diurnas
- Territoriais
- Cuidado parental elaborado
- Machos carregam girinos

**Reprodução:**
- Ovos no solo ou folhas
- Girinos carregados para água
- Algumas alimentam girinos com ovos
- Cuidado parental por meses

**Veneno:**
- Batracotoxinas (algumas espécies)
- Usado em flechas por indígenas
- Sem predadores naturais
- Cores avisam do perigo

**Curiosidades:**
- Não produzem veneno em cativeiro
- Estudos farmacêuticos
- Mais de 100 espécies`,
    tags: ['anuro', 'venenoso', 'colorido', 'diurno'],
  },

  // ================== PEIXES ==================
  {
    id: 'pirarucu',
    title: 'Pirarucu',
    category: 'peixes',
    subcategory: 'Osteíctes',
    scientificName: 'Arapaima gigas',
    status: 'LC',
    biome: ['Amazônia'],
    description: 'Um dos maiores peixes de água doce do mundo.',
    content: `O pirarucu é um dos maiores peixes de água doce do mundo, podendo atingir 3 metros.

**Características:**
- Comprimento: até 3 m
- Peso: até 200 kg
- Escamas grandes e resistentes
- Coloração cinza-esverdeada
- Cauda vermelha

**Habitat:**
Lagos, igapós e águas paradas amazônicas.

**Alimentação:**
- Piscívoro
- Também come crustáceos e aves
- Respira ar atmosférico

**Comportamento:**
- Sobe à superfície para respirar
- Pode sobreviver fora d'água brevemente
- Territorial na reprodução

**Reprodução:**
- Ninhos no substrato
- Macho protege ovos e filhotes
- Secreção na cabeça alimenta filhotes
- Cuidado parental por meses

**Importância Econômica:**
- Carne muito apreciada
- Pesca tradicional com arpão
- Manejo comunitário sustentável

**Conservação:**
- Pesca regulamentada
- Projetos de manejo em Mamirauá
- Piscicultura em expansão

**Curiosidades:**
- Fóssil vivo (200 milhões de anos)
- Escamas usadas como lixa
- Língua óssea (usada em raladores)`,
    tags: ['gigante', 'amazônia', 'respira ar', 'pesca'],
  },
  {
    id: 'piranha',
    title: 'Piranha-vermelha',
    category: 'peixes',
    subcategory: 'Osteíctes',
    scientificName: 'Pygocentrus nattereri',
    status: 'LC',
    biome: ['Amazônia', 'Pantanal'],
    description: 'Peixe carnívoro famoso por seus dentes afiados.',
    content: `A piranha é famosa mundialmente por sua reputação de predadora voraz.

**Características:**
- Comprimento: 25-35 cm
- Peso: até 4 kg
- Dentes triangulares afiados
- Mandíbula poderosa
- Ventre vermelho (adultos)

**Habitat:**
Rios, lagos e planícies alagadas.

**Alimentação:**
- Onívora (não só carne)
- Peixes, insetos, crustáceos
- Frutos e sementes
- Carniça e animais debilitados

**Comportamento:**
- Vivem em cardumes
- Mais ativas ao amanhecer e entardecer
- Ataques frenéticos são raros
- Geralmente tímidas com humanos

**Reprodução:**
- Desovam em vegetação
- Macho protege ovos
- Milhares de ovos por postura
- Filhotes se escondem em raízes

**Mitos vs Realidade:**
- Raramente atacam humanos
- Ataques ocorrem em condições extremas
- Importantes para ecossistema
- Controlam populações de peixes doentes

**Curiosidades:**
- Dentes se renovam
- Mordida de 72+ Newtons
- Podem comer 1/4 do peso por dia`,
    tags: ['carnívoro', 'cardume', 'dentes', 'amazônia'],
  },
  {
    id: 'peixe-eletrico',
    title: 'Poraquê (Peixe-elétrico)',
    category: 'peixes',
    subcategory: 'Osteíctes',
    scientificName: 'Electrophorus electricus',
    status: 'LC',
    biome: ['Amazônia'],
    description: 'Peixe capaz de gerar choques de até 860 volts.',
    content: `O poraquê é capaz de gerar os maiores choques elétricos do reino animal.

**Características:**
- Comprimento: até 2,5 m
- Peso: até 20 kg
- Corpo alongado (não é enguia)
- 80% do corpo são órgãos elétricos
- Cor cinza-escura

**Habitat:**
Águas turvas e pouco oxigenadas da Amazônia.

**Alimentação:**
- Peixes atordoados por choques
- Crustáceos e invertebrados
- Caça usando eletrolocalização

**Capacidade Elétrica:**
- Até 860 volts
- 3 órgãos elétricos distintos
- Choques de baixa voltagem para navegação
- Alta voltagem para caça e defesa

**Comportamento:**
- Respiram ar na superfície
- Noturnos
- Solitários geralmente
- Podem viver fora d'água brevemente

**Reprodução:**
- Machos constroem ninhos de espuma
- Milhares de ovos
- Cuidado parental pelo macho
- Filhotes comem ovos dos irmãos

**Curiosidades:**
- Inspirou a invenção da bateria
- Pode atordoar cavalos
- Pesquisas biomédicas
- 3 espécies descobertas recentemente`,
    tags: ['elétrico', 'amazônia', 'único', 'predador'],
  },
  {
    id: 'boto-cor-de-rosa',
    title: 'Boto-cor-de-rosa',
    category: 'mamiferos',
    subcategory: 'Cetáceos',
    scientificName: 'Inia geoffrensis',
    status: 'EN',
    biome: ['Amazônia'],
    description: 'Maior golfinho de rio do mundo, envolvido em lendas amazônicas.',
    content: `O boto-cor-de-rosa é o maior golfinho de água doce do mundo, cercado de lendas.

**Características:**
- Comprimento: 2-2,5 m
- Peso: 100-200 kg
- Coloração rosa (adultos)
- Focinho longo com cerdas
- Pescoço flexível (vértebras não fundidas)

**Habitat:**
Rios, lagos e igapós amazônicos.

**Alimentação:**
- Mais de 50 espécies de peixes
- Caranguejos e tartarugas
- Usa ecolocalização
- Caça entre raízes e troncos

**Comportamento:**
- Solitários ou pequenos grupos
- Curiosos e brincalhões
- Nadam de cabeça para baixo
- Menos acrobáticos que golfinhos marinhos

**Reprodução:**
- Gestação: 11-12 meses
- Um filhote a cada 2-3 anos
- Amamentação prolongada
- Machos competem com força

**Lenda do Boto:**
Na mitologia amazônica, o boto se transforma em homem bonito nas festas juninas.

**Ameaças:**
- Poluição por mercúrio (garimpo)
- Capturas acidentais
- Hidrelétricas

**Conservação:**
Protegido por lei, mas população em declínio.`,
    tags: ['cetáceo', 'água doce', 'rosa', 'ameaçado'],
  },

  // ================== BIOMAS ==================
  {
    id: 'bioma-amazonia',
    title: 'Bioma Amazônia',
    category: 'biomas',
    description: 'Maior floresta tropical do mundo, com biodiversidade incomparável.',
    content: `A Amazônia é a maior floresta tropical do mundo, essencial para o clima global.

**Área:**
- 4,2 milhões km² no Brasil
- 9 países compartilham a região
- 49% do território brasileiro

**Clima:**
- Equatorial quente e úmido
- Temperatura: 22-28°C
- Chuvas: 1.500-3.000 mm/ano
- Sem estação seca definida

**Vegetação:**
- Floresta densa e estratificada
- Árvores de até 60 m
- Mata de terra firme
- Matas de igapó e várzea
- Mais de 40.000 espécies de plantas

**Fauna:**
- 427 mamíferos
- 1.300 aves
- 378 répteis
- 400 anfíbios
- 3.000 peixes
- Milhões de insetos

**Rios:**
- Bacia amazônica: maior do mundo
- Rio Amazonas: maior vazão
- Milhares de afluentes
- 20% da água doce do planeta

**Importância:**
- Regulação climática global
- Ciclo das águas
- Estoque de carbono
- Farmácia natural

**Ameaças:**
- Desmatamento
- Garimpo ilegal
- Agropecuária
- Queimadas`,
    tags: ['floresta', 'tropical', 'biodiversidade', 'clima'],
  },
  {
    id: 'bioma-cerrado',
    title: 'Bioma Cerrado',
    category: 'biomas',
    description: 'Savana mais biodiversa do mundo, berço das águas brasileiras.',
    content: `O Cerrado é a savana mais biodiversa do planeta e berço de grandes rios brasileiros.

**Área:**
- 2 milhões km²
- 22% do território brasileiro
- Segundo maior bioma

**Clima:**
- Tropical sazonal
- Estação seca: maio-setembro
- Estação chuvosa: outubro-abril
- Temperatura: 22-27°C

**Vegetação:**
- Formações savânicas
- Árvores de troncos tortuosos
- Casca grossa (proteção contra fogo)
- Raízes profundas
- 12.000 espécies de plantas

**Fauna:**
- 251 mamíferos
- 856 aves
- 262 répteis
- 209 anfíbios
- Muitas espécies endêmicas

**Recursos Hídricos:**
- Nascentes de 8 bacias hidrográficas
- Aquífero Guarani
- Rios São Francisco, Tocantins, Paraná

**Adaptações ao Fogo:**
- Plantas rebrotam após queimadas
- Sementes precisam de fogo
- Fogo natural faz parte do ciclo

**Ameaças:**
- Agronegócio (soja, algodão, pecuária)
- Apenas 8% protegido
- Bioma mais ameaçado do Brasil`,
    tags: ['savana', 'fogo', 'nascentes', 'ameaçado'],
  },
  {
    id: 'bioma-mata-atlantica',
    title: 'Bioma Mata Atlântica',
    category: 'biomas',
    description: 'Floresta tropical mais ameaçada, com altíssimo endemismo.',
    content: `A Mata Atlântica é uma das florestas mais ameaçadas e biodiversas do planeta.

**Área Original:**
- 1,3 milhão km²
- 15% do território brasileiro
- Hoje restam apenas 12,4%

**Clima:**
- Tropical a subtropical
- Chuvas bem distribuídas
- Temperaturas amenas
- Neblina frequente nas serras

**Vegetação:**
- Floresta ombrófila densa
- Floresta ombrófila mista (araucárias)
- Restingas e manguezais
- 20.000 espécies de plantas

**Fauna:**
- 298 mamíferos
- 992 aves
- 306 répteis
- 475 anfíbios
- Altíssimo endemismo

**Espécies Endêmicas:**
- Mico-leão-dourado
- Muriqui
- Jacutinga
- Saíra-sapucaia

**Importância:**
- 70% da população brasileira
- Abastecimento de água
- Regulação climática
- Ecoturismo

**Conservação:**
- Lei da Mata Atlântica
- Reserva da Biosfera
- Corredor Central
- Programa de restauração`,
    tags: ['floresta', 'endêmica', 'ameaçada', 'restauração'],
  },
  {
    id: 'bioma-pantanal',
    title: 'Bioma Pantanal',
    category: 'biomas',
    description: 'Maior planície alagável do mundo, santuário de vida silvestre.',
    content: `O Pantanal é a maior planície alagável continental do planeta.

**Área:**
- 150.000 km² no Brasil
- Mato Grosso e Mato Grosso do Sul
- Também em Bolívia e Paraguai

**Clima:**
- Tropical continental
- Cheias: novembro-março
- Secas: abril-setembro
- Temperatura: 25-35°C

**Ciclo das Águas:**
- Alagamentos anuais
- Até 80% coberto por água
- Nutrientes trazidos pelas cheias
- Pulso de inundação

**Fauna:**
- 159 mamíferos
- 656 aves
- 98 répteis
- 53 anfíbios
- Maior concentração de fauna das Américas

**Megafauna:**
- Onça-pintada (maior densidade mundial)
- Jacaré-do-pantanal
- Arara-azul
- Tuiuiú (ave-símbolo)

**Vegetação:**
- Mosaico de formações
- Campos inundáveis
- Cordilheiras (áreas elevadas)
- Matas ciliares

**Ameaças:**
- Incêndios (2020 foi devastador)
- Desmatamento nas cabeceiras
- Assoreamento dos rios
- Hidrelétricas

**Patrimônio:**
- Reserva da Biosfera (UNESCO)
- Patrimônio Natural da Humanidade`,
    tags: ['alagável', 'megafauna', 'onça', 'tuiuiú'],
  },
  {
    id: 'bioma-caatinga',
    title: 'Bioma Caatinga',
    category: 'biomas',
    description: 'Único bioma exclusivamente brasileiro, adaptado à seca.',
    content: `A Caatinga é o único bioma exclusivamente brasileiro, com adaptações únicas à seca.

**Área:**
- 844.000 km²
- 11% do território brasileiro
- Nordeste do Brasil

**Clima:**
- Semiárido
- Chuvas: 250-900 mm/ano
- Temperaturas altas
- Secas prolongadas

**Vegetação:**
- Plantas caducifólias (perdem folhas)
- Espinhos e cactáceas
- Raízes profundas
- Armazenamento de água
- 4.300 espécies de plantas

**Fauna:**
- 148 mamíferos
- 510 aves
- 107 répteis
- 49 anfíbios
- Adaptações à seca

**Animais Notáveis:**
- Ararinha-azul (extinta na natureza)
- Tatu-bola
- Jaguatirica
- Soldadinho-do-araripe

**Adaptações:**
- Plantas suculentas
- Animais noturnos
- Estivação (dormência na seca)
- Reprodução rápida nas chuvas

**Importância:**
- 28 milhões de pessoas
- Pecuária tradicional
- Plantas medicinais
- Mel de abelhas nativas

**Conservação:**
- Apenas 7,5% protegido
- Desmatamento para lenha
- Sobrepastoreio`,
    tags: ['semiárido', 'seca', 'adaptações', 'exclusivo'],
  },
  {
    id: 'bioma-pampa',
    title: 'Bioma Pampa',
    category: 'biomas',
    description: 'Campos do sul, berço da cultura gaúcha.',
    content: `O Pampa é o bioma campestre do sul do Brasil, com biodiversidade única.

**Área:**
- 176.000 km²
- 2% do território brasileiro
- Exclusivo do Rio Grande do Sul

**Clima:**
- Subtropical
- Quatro estações definidas
- Geadas frequentes
- Chuvas bem distribuídas

**Vegetação:**
- Campos nativos
- Gramíneas diversas
- Capões de mata
- Matas ciliares
- 3.000 espécies de plantas

**Fauna:**
- 102 mamíferos
- 476 aves
- 97 répteis
- 50 anfíbios

**Animais Notáveis:**
- Veado-campeiro
- Ema
- Graxaim
- Caturrita
- Tuco-tuco

**Uso Tradicional:**
- Pecuária extensiva há 300 anos
- Campos manejados com fogo
- Cultura gaúcha
- Erva-mate

**Ameaças:**
- Conversão para lavouras
- Silvicultura de pinus e eucalipto
- Apenas 36% restantes
- Invasão de espécies exóticas

**Conservação:**
- Menos de 3% protegido
- Bioma mais descaracterizado
- Projetos de restauração`,
    tags: ['campos', 'gramíneas', 'gaúcho', 'pecuária'],
  },

  // ================== RIOS ==================
  {
    id: 'rio-amazonas',
    title: 'Rio Amazonas',
    category: 'rios',
    description: 'Maior rio do mundo em vazão, drena a maior floresta tropical.',
    content: `O Rio Amazonas é o maior rio do mundo em volume de água.

**Dimensões:**
- Comprimento: ~6.400 km
- Largura: até 50 km em alguns trechos
- Profundidade: até 100 m
- Vazão: 209.000 m³/s

**Bacia Hidrográfica:**
- 7 milhões km²
- 9 países
- 20% da água doce global
- 1.100 afluentes

**Nascente:**
- Nevado Mismi, Peru
- 5.300 m de altitude
- Nome: Rio Apurímac inicialmente

**Foz:**
- Oceano Atlântico
- Águas doces a 100 km da costa
- Fenômeno da pororoca

**Biodiversidade:**
- 3.000+ espécies de peixes
- Pirarucu, boto, peixe-boi
- Tartarugas, jacarés
- Maior diversidade de água doce

**Tipos de Água:**
- Águas brancas (sedimentos)
- Águas negras (ácidos húmicos)
- Águas claras

**Comunidades:**
- Povos ribeirinhos
- Pesca artesanal
- Transporte fluvial
- Agricultura de várzea

**Importância:**
- Estrada natural da Amazônia
- Ciclo hidrológico continental
- Regulação climática`,
    tags: ['maior', 'vazão', 'bacia', 'biodiversidade'],
  },
  {
    id: 'rio-sao-francisco',
    title: 'Rio São Francisco',
    category: 'rios',
    description: 'Rio da integração nacional, atravessa o semiárido nordestino.',
    content: `O Rio São Francisco é o maior rio genuinamente brasileiro.

**Dimensões:**
- Comprimento: 2.863 km
- Bacia: 639.000 km²
- Nasce em MG, deságua no Atlântico (SE/AL)

**Nascente:**
- Serra da Canastra, MG
- Parque Nacional
- 1.200 m de altitude

**Regiões:**
- Alto: nascente até Pirapora
- Médio: Pirapora até Remanso
- Submédio: Remanso até Paulo Afonso
- Baixo: Paulo Afonso até foz

**Importância:**
- Atravessa o semiárido
- Irrigação no Nordeste
- Energia hidrelétrica
- Transporte fluvial

**Transposição:**
- Projeto polêmico
- Eixos Norte e Leste
- Água para regiões secas

**Biodiversidade:**
- 152 espécies de peixes
- 32 endêmicas
- Surubim, dourado, pirá
- Aves migratórias

**Problemas:**
- Assoreamento
- Poluição
- Redução de vazão
- Mortandade de peixes

**Cultura:**
- Carrancas nos barcos
- Folclore ribeirinho
- Música e literatura`,
    tags: ['integração', 'semiárido', 'transposição', 'carrancas'],
  },
  {
    id: 'rio-pantanal',
    title: 'Rios do Pantanal',
    category: 'rios',
    description: 'Sistema de rios que forma a maior planície alagável do mundo.',
    content: `O Pantanal é formado por um complexo sistema de rios.

**Principais Rios:**
- Rio Paraguai (eixo principal)
- Rio Cuiabá
- Rio São Lourenço
- Rio Taquari
- Rio Miranda

**Rio Paraguai:**
- Comprimento: 2.621 km
- Nasce em MT
- Drena todo Pantanal
- Deságua no Rio Paraná

**Pulso de Inundação:**
- Cheias anuais (nov-mar)
- Águas sobem até 5 m
- Nutrientes da enchente
- Ciclo de vida sincronizado

**Fenômenos:**
- Corixos (canais naturais)
- Baías (lagoas)
- Cordilheiras (áreas secas)
- Vazantes (áreas baixas)

**Biodiversidade Aquática:**
- 263 espécies de peixes
- Dourado, pacu, pintado
- Piranhas, arraias
- Jacarés aos milhares

**Pesca:**
- Turismo de pesca
- Pesca profissional
- Piracema (defeso)
- Manejo sustentável

**Ameaças:**
- Assoreamento (Rio Taquari crítico)
- Hidrelétricas nas cabeceiras
- Poluição por agrotóxicos
- Mudanças climáticas`,
    tags: ['alagável', 'cheias', 'pesca', 'biodiversidade'],
  },

  // ================== FLORA ==================
  {
    id: 'castanheira',
    title: 'Castanheira-do-pará',
    category: 'flora',
    scientificName: 'Bertholletia excelsa',
    biome: ['Amazônia'],
    description: 'Árvore gigante produtora da castanha-do-brasil.',
    content: `A castanheira é uma das maiores árvores da Amazônia, produtora da famosa castanha.

**Características:**
- Altura: até 60 m
- Diâmetro: até 5 m
- Longevidade: 500-1.000 anos
- Copa emerge acima da floresta

**Fruto:**
- Ouriço lenhoso (1-2 kg)
- 15-25 sementes (castanhas)
- Cai naturalmente
- Polinização por abelhas grandes

**Ecologia:**
- Depende de floresta intacta
- Cotia dispersa sementes
- Não se reproduz em monoculturas
- Indicadora de floresta madura

**Importância Econômica:**
- Castanha comestível
- Óleo para cosméticos
- Extrativismo tradicional
- Sustento de comunidades

**Legislação:**
- Proibido derrubar
- Árvore protegida por lei
- Manejo sustentável permitido

**Nutrientes:**
- Rica em selênio
- Proteínas e gorduras boas
- Exportação mundial

**Desafios:**
- Não se cultiva comercialmente
- Produção depende de floresta
- Ciclo reprodutivo longo`,
    tags: ['árvore', 'castanha', 'extrativismo', 'protegida'],
  },
  {
    id: 'araucaria',
    title: 'Araucária',
    category: 'flora',
    scientificName: 'Araucaria angustifolia',
    biome: ['Mata Atlântica'],
    status: 'CR',
    description: 'Pinheiro brasileiro, símbolo do Sul do país.',
    content: `A araucária é o pinheiro brasileiro, árvore símbolo do Sul do país.

**Características:**
- Altura: até 50 m
- Forma de candelabro
- Folhas em escamas
- Casca grossa em placas
- Dioica (sexos separados)

**Pinhão:**
- Semente comestível
- 100-150 por pinha
- Alimento tradicional
- Base da dieta de fauna

**Distribuição:**
- Sul do Brasil
- Planaltos e serras
- Clima subtropical
- Resistente ao frio

**Fauna Associada:**
- Gralha-azul (dispersora)
- Papagaio-charão
- Cateto e queixada
- Pacas e cutias

**História:**
- Restam 3% da floresta original
- Exploração madeireira intensa
- Criticamente ameaçada

**Conservação:**
- Lei de proteção
- Proibido corte
- Projetos de restauração
- Coleta de pinhão regulada

**Importância Cultural:**
- Identidade regional
- Festas do pinhão
- Artesanato
- Paisagem característica`,
    tags: ['pinheiro', 'pinhão', 'sul', 'ameaçada'],
  },
  {
    id: 'palmito-jucara',
    title: 'Palmito-juçara',
    category: 'flora',
    scientificName: 'Euterpe edulis',
    biome: ['Mata Atlântica'],
    status: 'VU',
    description: 'Palmeira nativa produtora de palmito e açaí da Mata Atlântica.',
    content: `O palmito-juçara é uma palmeira nativa da Mata Atlântica, irmã do açaí amazônico.

**Características:**
- Altura: 8-20 m
- Estipe único (não rebrota)
- Folhas pinadas
- Cacho de frutos roxos

**Palmito:**
- Coração da palmeira
- Extração mata a planta
- Iguaria culinária
- Exploração predatória histórica

**Fruto (Juçara):**
- Similar ao açaí
- Polpa nutritiva
- Alternativa sustentável
- Mercado em crescimento

**Ecologia:**
- Dispersão por aves
- Tucanos e jacutingas
- Floresta madura
- Espécie-chave

**Conservação:**
- Extração de palmito ilegal
- Manejo sustentável do fruto
- Projetos de restauração
- Agroflorestas

**Produtos:**
- Polpa (juçara)
- Palmito (insustentável)
- Artesanato com sementes

**Diferença do Açaí:**
Juçara não perfilha (uma palmeira = um palmito).`,
    tags: ['palmeira', 'palmito', 'juçara', 'ameaçada'],
  },
  {
    id: 'vitoria-regia',
    title: 'Vitória-régia',
    category: 'flora',
    scientificName: 'Victoria amazonica',
    biome: ['Amazônia'],
    description: 'Maior planta aquática do mundo, com folhas de até 2,5 metros.',
    content: `A vitória-régia é a maior planta aquática do mundo, símbolo da Amazônia.

**Características:**
- Folhas: até 2,5 m de diâmetro
- Bordas levantadas
- Estrutura resistente
- Espinhos na face inferior

**Flor:**
- Branca (primeiro dia)
- Rosa (segundo dia)
- Abre à noite
- Perfume intenso
- 25-35 cm de diâmetro

**Habitat:**
- Lagos e igapós amazônicos
- Águas calmas e turvas
- Profundidade de 1-3 m

**Polinização:**
- Besouros (cantarofilia)
- Flor aquece e prende besouros
- Libera pólen no 2º dia

**Capacidade:**
- Suporta até 40 kg
- Nervuras como vigas
- Inspiração arquitetônica

**Ciclo de Vida:**
- Planta perene
- Folhas duram semanas
- Rizoma submerso
- Sementes flutuantes

**Curiosidades:**
- Descoberta em 1801
- Nomeada em homenagem à Rainha Vitória
- Cristal Palace inspirado na estrutura
- Símbolo do Amazonas`,
    tags: ['aquática', 'maior', 'amazônia', 'flor noturna'],
  },

  // ================== INSETOS ==================
  {
    id: 'morpho',
    title: 'Borboleta Morpho',
    category: 'insetos',
    subcategory: 'Lepidópteros',
    scientificName: 'Morpho sp.',
    biome: ['Amazônia', 'Mata Atlântica'],
    description: 'Grandes borboletas de azul iridescente.',
    content: `As borboletas Morpho são famosas por suas asas azuis brilhantes.

**Características:**
- Envergadura: 12-20 cm
- Azul iridescente (machos)
- Face inferior marrom com ocelos
- Voo lento e ondulante

**Coloração:**
- Não é pigmento
- Estrutura microscópica das escamas
- Refração da luz (cor estrutural)
- Muda conforme ângulo

**Habitat:**
- Florestas tropicais
- Voam no dossel
- Descem ao solo para minerais

**Alimentação:**
- Adultos: frutas fermentadas
- Fluidos de animais em decomposição
- Não visitam flores
- Lagartas: plantas específicas

**Ciclo de Vida:**
- Ovos: 9 dias
- Lagarta: 2-3 meses
- Pupa: 1-2 meses
- Adulto: 2-3 meses

**Defesa:**
- Face marrom camuflada
- Ocelos assustam predadores
- Voo errático

**Importância:**
- Indicadores ambientais
- Atração turística
- Inspiração para tecnologia`,
    tags: ['borboleta', 'azul', 'iridescente', 'floresta'],
  },
  {
    id: 'abelha-nativa',
    title: 'Abelhas Nativas Sem Ferrão',
    category: 'insetos',
    subcategory: 'Himenópteros',
    scientificName: 'Meliponini',
    biome: ['Amazônia', 'Mata Atlântica', 'Cerrado', 'Caatinga'],
    description: 'Abelhas brasileiras sem ferrão, produtoras de mel especial.',
    content: `As abelhas nativas sem ferrão são polinizadores essenciais da flora brasileira.

**Principais Espécies:**
- Jataí (Tetragonisca angustula)
- Uruçu (Melipona scutellaris)
- Mandaçaia (Melipona quadrifasciata)
- Tiúba (Melipona compressipes)
- Iraí (Nannotrigona testaceicornis)

**Características:**
- Não possuem ferrão funcional
- Colônias menores que Apis
- Mel mais líquido
- Própolis diferenciada

**Mel:**
- Produção menor
- Propriedades medicinais
- Preço mais alto
- Sabor único por espécie

**Polinização:**
- 40-90% da flora nativa
- Especializadas em certas flores
- Complementam abelhas europeias
- Essenciais para florestas

**Meliponicultura:**
- Criação tradicional
- Crescimento do interesse
- Renda para comunidades
- Conservação de espécies

**Ameaças:**
- Desmatamento
- Agrotóxicos
- Competição com Apis mellifera
- Coleta predatória

**Importância:**
- Polinização nativa
- Mel medicinal
- Patrimônio cultural indígena`,
    tags: ['abelha', 'polinização', 'mel', 'nativa'],
  },

  // ================== CONSERVAÇÃO ==================
  {
    id: 'unidades-conservacao',
    title: 'Unidades de Conservação',
    category: 'conservacao',
    description: 'Sistema brasileiro de áreas protegidas.',
    content: `O Brasil possui um robusto sistema de áreas protegidas.

**SNUC - Sistema Nacional:**
Criado em 2000 para organizar as UCs brasileiras.

**Proteção Integral:**
- Estação Ecológica
- Reserva Biológica
- Parque Nacional
- Monumento Natural
- Refúgio de Vida Silvestre

**Uso Sustentável:**
- Área de Proteção Ambiental (APA)
- Área de Relevante Interesse Ecológico
- Floresta Nacional (FLONA)
- Reserva Extrativista (RESEX)
- Reserva de Fauna
- Reserva de Desenvolvimento Sustentável
- Reserva Particular (RPPN)

**Números:**
- 2.000+ UCs federais e estaduais
- 18% do território terrestre
- 26% das águas jurisdicionais

**Gestão:**
- ICMBio (federal)
- Órgãos estaduais
- Municípios
- Iniciativa privada (RPPNs)

**Desafios:**
- Fiscalização insuficiente
- Falta de regularização fundiária
- Orçamento reduzido
- Pressões políticas

**Terras Indígenas:**
- Não são UCs formalmente
- Papel crucial na conservação
- 13% do território nacional`,
    tags: ['proteção', 'parques', 'reservas', 'gestão'],
  },
  {
    id: 'lista-vermelha',
    title: 'Lista Vermelha de Espécies Ameaçadas',
    category: 'conservacao',
    description: 'Sistema de classificação do risco de extinção de espécies.',
    content: `A Lista Vermelha avalia o risco de extinção das espécies.

**Categorias IUCN:**
- EX - Extinto
- EW - Extinto na Natureza
- CR - Criticamente em Perigo
- EN - Em Perigo
- VU - Vulnerável
- NT - Quase Ameaçado
- LC - Pouco Preocupante
- DD - Dados Insuficientes

**Brasil - Fauna:**
- 1.173 espécies ameaçadas
- 318 aves
- 110 mamíferos
- 80 répteis
- 41 anfíbios
- 353 peixes

**Brasil - Flora:**
- 2.113 espécies ameaçadas

**Critérios de Avaliação:**
- Redução populacional
- Distribuição geográfica
- Tamanho populacional
- Análise quantitativa

**Espécies Emblemáticas Ameaçadas:**
- Ararinha-azul (EW)
- Mico-leão-dourado (EN)
- Onça-pintada (VU)
- Araucária (CR)

**Importância:**
- Orienta políticas públicas
- Prioriza ações de conservação
- Monitora tendências
- Atualização periódica

**Planos de Ação (PAN):**
- Recuperação de espécies
- Metas mensuráveis
- Parcerias diversas`,
    tags: ['ameaçadas', 'extinção', 'avaliação', 'IUCN'],
  },

  // ================== LEGISLAÇÃO ==================
  {
    id: 'lei-crimes-ambientais',
    title: 'Lei de Crimes Ambientais',
    category: 'legislacao',
    description: 'Lei 9.605/1998 - Define crimes e infrações ambientais.',
    content: `A Lei de Crimes Ambientais tipifica condutas lesivas ao meio ambiente.

**Lei 9.605/1998:**
Dispõe sobre sanções penais e administrativas.

**Crimes contra a Fauna:**
- Matar, caçar, perseguir animais
- Apanhar ovos ou filhotes
- Maus-tratos
- Tráfico de animais
- Penas: 6 meses a 5 anos

**Crimes contra a Flora:**
- Destruir floresta de preservação
- Cortar árvores sem autorização
- Provocar incêndio
- Penas: 1 a 5 anos

**Poluição:**
- Causar poluição
- Lançar resíduos
- Degradação ambiental

**Crimes Administrativos:**
- Funcionário que facilita crime
- Omissão de fiscalização

**Responsabilidades:**
- Pessoa física
- Pessoa jurídica
- Multas de R$50 a R$50 milhões

**Agravantes:**
- Unidade de conservação
- Espécies ameaçadas
- Período de reprodução
- Noite ou feriado

**Atenuantes:**
- Baixo grau de instrução
- Reparação do dano
- Comunicação prévia`,
    tags: ['lei', 'crimes', 'penalidades', 'fiscalização'],
  },
  {
    id: 'codigo-florestal',
    title: 'Código Florestal',
    category: 'legislacao',
    description: 'Lei 12.651/2012 - Proteção da vegetação nativa.',
    content: `O Código Florestal estabelece normas sobre proteção da vegetação.

**Lei 12.651/2012:**
Define áreas de preservação e reservas.

**APP - Área de Preservação Permanente:**
- Margens de rios
- Nascentes (50m)
- Topos de morros
- Encostas íngremes
- Manguezais

**Largura APP por rio:**
- Até 10m de largura: 30m de APP
- 10-50m: 50m de APP
- 50-200m: 100m de APP
- 200-600m: 200m de APP
- Mais de 600m: 500m de APP

**Reserva Legal:**
- Amazônia: 80%
- Cerrado na Amazônia Legal: 35%
- Demais regiões: 20%

**CAR - Cadastro Ambiental Rural:**
- Registro obrigatório
- Identificação do imóvel
- APP e Reserva Legal
- Base para fiscalização

**PRA - Programa de Regularização:**
- Recuperação de APP
- Compensação de Reserva Legal
- Adesão voluntária

**Polêmicas:**
- Anistia a desmatadores
- Redução de proteção
- Discussões sobre efetividade`,
    tags: ['código', 'florestal', 'APP', 'reserva legal'],
  },
  {
    id: 'ibama-licenciamento',
    title: 'Licenciamento Ambiental',
    category: 'legislacao',
    description: 'Processo de avaliação de impacto de empreendimentos.',
    content: `O licenciamento ambiental avalia impactos de atividades potencialmente poluidoras.

**Etapas:**
1. Licença Prévia (LP)
2. Licença de Instalação (LI)
3. Licença de Operação (LO)

**Licença Prévia:**
- Viabilidade ambiental
- Localização e concepção
- Requisitos básicos
- EIA/RIMA quando necessário

**Licença de Instalação:**
- Autoriza início das obras
- Medidas mitigadoras
- Programas ambientais
- Condicionantes

**Licença de Operação:**
- Autoriza funcionamento
- Monitoramento contínuo
- Validade determinada
- Renovação periódica

**Competência:**
- IBAMA: impacto nacional/regional
- Órgãos estaduais: maioria dos casos
- Municípios: impacto local

**EIA/RIMA:**
- Estudo de Impacto Ambiental
- Relatório de Impacto Ambiental
- Equipe multidisciplinar
- Audiências públicas

**Compensação Ambiental:**
- Mínimo 0,5% do custo
- Apoio a UCs
- Obrigatório para impactos significativos`,
    tags: ['licenciamento', 'IBAMA', 'EIA', 'impacto'],
  },
];

// Função para buscar itens
export function searchLibrary(query: string): LibraryItem[] {
  const lowerQuery = query.toLowerCase();
  return offlineLibrary.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.content.toLowerCase().includes(lowerQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    (item.scientificName && item.scientificName.toLowerCase().includes(lowerQuery))
  );
}

// Função para filtrar por categoria
export function filterByCategory(category: string): LibraryItem[] {
  if (category === 'all') return offlineLibrary;
  return offlineLibrary.filter(item => item.category === category);
}

// Função para obter estatísticas
export function getLibraryStats() {
  const categories: Record<string, number> = {};
  offlineLibrary.forEach(item => {
    categories[item.category] = (categories[item.category] || 0) + 1;
  });
  return {
    total: offlineLibrary.length,
    categories,
  };
}
