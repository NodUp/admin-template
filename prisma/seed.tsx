import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.users.create({
    data: {
      email: 'admin@template.com.br',
      password: '$2b$08$jHQuTFGxKol.P3B7E0vUMOM7C5gviZEzdhAWlwHL6.m4n.VshAuuq',
      status: 'ATIVO',
      role: 'ADMIN',
      person: {
        create: {
          name: 'Admin',
        },
      },
      company: {
        create: {
          name: 'Template Company',
          logo: 'https://i.imgur.com/gnVmaqz.jpg',
          createdAt: new Date(),
        },
      },
    },
  });

  await prisma.companies.create({
    data: {
      name: 'nodUp Tecnologia',
      logo: 'https://i.imgur.com/qjYUQfa.png',
      createdAt: new Date(),
    },
  });
  await prisma.states.create({
    data: {
      name: 'Rio Grande do Norte',
      acronym: 'RN',
      cities: {
        createMany: {
          data: [
            { name: 'Acari' },
            { name: 'Açu' },
            { name: 'Afonso Bezerra' },
            { name: 'Água Nova' },
            { name: 'Alexandria' },
            { name: 'Almino Afonso' },
            { name: 'Alto do Rodrigues' },
            { name: 'Angicos' },
            { name: 'Antônio Martins' },
            { name: 'Apodi' },
            { name: 'Areia Branca' },
            { name: 'Arês' },
            { name: 'Augusto Severo' },
            { name: 'Baía Formosa' },
            { name: 'Baraúna' },
            { name: 'Barcelona' },
            { name: 'Bento Fernandes' },
            { name: 'Bodó' },
            { name: 'Bom Jesus' },
            { name: 'Brejinho' },
            { name: 'Caiçara do Norte' },
            { name: 'Caiçara do Rio do Vento' },
            { name: 'Caicó' },
            { name: 'Campo Redondo' },
            { name: 'Canguaretama' },
            { name: 'Caraúbas' },
            { name: 'Carnaúba dos Dantas' },
            { name: 'Carnaubais' },
            { name: 'Ceará-Mirim' },
            { name: 'Cerro Corá' },
            { name: 'Coronel Ezequiel' },
            { name: 'Coronel João Pessoa' },
            { name: 'Cruzeta' },
            { name: 'Currais Novos' },
            { name: 'Doutor Severiano' },
            { name: 'Encanto' },
            { name: 'Equador' },
            { name: 'Espírito Santo' },
            { name: 'Extremoz' },
            { name: 'Felipe Guerra' },
            { name: 'Fernando Pedroza' },
            { name: 'Florânia' },
            { name: 'Francisco Dantas' },
            { name: 'Frutuoso Gomes' },
            { name: 'Galinhos' },
            { name: 'Goianinha' },
            { name: 'Governador Dix-Sept Rosado' },
            { name: 'Grossos' },
            { name: 'Guamaré' },
            { name: 'Ielmo Marinho' },
            { name: 'Ipanguaçu' },
            { name: 'Ipueira' },
            { name: 'Itajá' },
            { name: 'Itaú' },
            { name: 'Jaçanã' },
            { name: 'Jandaíra' },
            { name: 'Janduís' },
            { name: 'Januário Cicco' },
            { name: 'Japi' },
            { name: 'Jardim de Angicos' },
            { name: 'Jardim de Piranhas' },
            { name: 'Jardim do Seridó' },
            { name: 'João Câmara' },
            { name: 'João Dias' },
            { name: 'José da Penha' },
            { name: 'Jucurutu' },
            { name: 'Jundiá' },
            { name: "Lagoa d'Anta" },
            { name: 'Lagoa de Pedras' },
            { name: 'Lagoa de Velhos' },
            { name: 'Lagoa Nova' },
            { name: 'Lagoa Salgada' },
            { name: 'Lajes' },
            { name: 'Lajes Pintadas' },
            { name: 'Lucrécia' },
            { name: 'Luís Gomes' },
            { name: 'Macaíba' },
            { name: 'Macau' },
            { name: 'Major Sales' },
            { name: 'Marcelino Vieira' },
            { name: 'Martins' },
            { name: 'Maxaranguape' },
            { name: 'Messias Targino' },
            { name: 'Montanhas' },
            { name: 'Monte Alegre' },
            { name: 'Monte das Gameleiras' },
            { name: 'Mossoró' },
            { name: 'Natal' },
            { name: 'Nísia Floresta' },
            { name: 'Nova Cruz' },
            { name: "Olho-d'Água do Borges" },
            { name: 'Ouro Branco' },
            { name: 'Paraná' },
            { name: 'Paraú' },
            { name: 'Parazinho' },
            { name: 'Parelhas' },
            { name: 'Parnamirim' },
            { name: 'Passa e Fica' },
            { name: 'Passagem' },
            { name: 'Patu' },
            { name: 'Pau dos Ferros' },
            { name: 'Pedra Grande' },
            { name: 'Pedra Preta' },
            { name: 'Pedro Avelino' },
            { name: 'Pedro Velho' },
            { name: 'Pendências' },
            { name: 'Pilões' },
            { name: 'Poço Branco' },
            { name: 'Portalegre' },
            { name: 'Porto do Mangue' },
            { name: 'Presidente Juscelino' },
            { name: 'Pureza' },
            { name: 'Rafael Fernandes' },
            { name: 'Rafael Godeiro' },
            { name: 'Riacho da Cruz' },
            { name: 'Riacho de Santana' },
            { name: 'Riachuelo' },
            { name: 'Rio do Fogo' },
            { name: 'Rodolfo Fernandes' },
            { name: 'Ruy Barbosa' },
            { name: 'Santa Cruz' },
            { name: 'Santa Maria' },
            { name: 'Santana do Matos' },
            { name: 'Santana do Seridó' },
            { name: 'Santo Antônio' },
            { name: 'São Bento do Norte' },
            { name: 'São Bento do Trairí' },
            { name: 'São Fernando' },
            { name: 'São Francisco do Oeste' },
            { name: 'São Gonçalo do Amarante' },
            { name: 'São João do Sabugi' },
            { name: 'São José de Mipibu' },
            { name: 'São José do Campestre' },
            { name: 'São José do Seridó' },
            { name: 'São Miguel' },
            { name: 'São Miguel do Gostoso' },
            { name: 'São Paulo do Potengi' },
            { name: 'São Pedro' },
            { name: 'São Rafael' },
            { name: 'São Tomé' },
            { name: 'São Vicente' },
            { name: 'Senador Elói de Souza' },
            { name: 'Senador Georgino Avelino' },
            { name: 'Serra de São Bento' },
            { name: 'Serra do Mel' },
            { name: 'Serra Negra do Norte' },
            { name: 'Serrinha' },
            { name: 'Serrinha dos Pintos' },
            { name: 'Severiano Melo' },
            { name: 'Sítio Novo' },
            { name: 'Taboleiro Grande' },
            { name: 'Taipu' },
            { name: 'Tangará' },
            { name: 'Tenente Ananias' },
            { name: 'Tenente Laurentino Cruz' },
            { name: 'Tibau' },
            { name: 'Tibau do Sul' },
            { name: 'Timbaúba dos Batistas' },
            { name: 'Touros' },
            { name: 'Triunfo Potiguar' },
            { name: 'Umarizal' },
            { name: 'Upanema' },
            { name: 'Várzea' },
            { name: 'Venha-Ver' },
            { name: 'Vera Cruz' },
            { name: 'Viçosa' },
            { name: 'Vila Flor' },
          ],
        },
      },
    },
  });

  await prisma.states.create({
    data: {
      name: 'Ceará',
      acronym: 'CE',
      cities: {
        createMany: {
          data: [
            { name: 'Abaiara' },
            { name: 'Acarape' },
            { name: 'Acaraú' },
            { name: 'Acopiara' },
            { name: 'Aiuaba' },
            { name: 'Alcântaras' },
            { name: 'Altaneira' },
            { name: 'Alto Santo' },
            { name: 'Amontada' },
            { name: 'Antonina do Norte' },
            { name: 'Apuiarés' },
            { name: 'Aquiraz' },
            { name: 'Aracati' },
            { name: 'Aracoiaba' },
            { name: 'Ararendá' },
            { name: 'Araripe' },
            { name: 'Aratuba' },
            { name: 'Arneiroz' },
            { name: 'Assaré' },
            { name: 'Aurora' },
            { name: 'Baixio' },
            { name: 'Banabuiú' },
            { name: 'Barbalha' },
            { name: 'Barreira' },
            { name: 'Barro' },
            { name: 'Barroquinha' },
            { name: 'Baturité' },
            { name: 'Beberibe' },
            { name: 'Bela Cruz' },
            { name: 'Boa Viagem' },
            { name: 'Brejo Santo' },
            { name: 'Camocim' },
            { name: 'Campos Sales' },
            { name: 'Canindé' },
            { name: 'Capistrano' },
            { name: 'Caridade' },
            { name: 'Cariré' },
            { name: 'Caririaçu' },
            { name: 'Cariús' },
            { name: 'Carnaubal' },
            { name: 'Cascavel' },
            { name: 'Catarina' },
            { name: 'Catunda' },
            { name: 'Caucaia' },
            { name: 'Cedro' },
            { name: 'Chaval' },
            { name: 'Choró' },
            { name: 'Chorozinho' },
            { name: 'Coreaú' },
            { name: 'Crateús' },
            { name: 'Crato' },
            { name: 'Croatá' },
            { name: 'Cruz' },
            { name: 'Deputado Irapuan Pinheiro' },
            { name: 'Ererê' },
            { name: 'Eusébio' },
            { name: 'Farias Brito' },
            { name: 'Forquilha' },
            { name: 'Fortaleza' },
            { name: 'Fortim' },
            { name: 'Frecheirinha' },
            { name: 'General Sampaio' },
            { name: 'Graça' },
            { name: 'Granja' },
            { name: 'Granjeiro' },
            { name: 'Groaíras' },
            { name: 'Guaiúba' },
            { name: 'Guaraciaba do Norte' },
            { name: 'Guaramiranga' },
            { name: 'Hidrolândia' },
            { name: 'Horizonte' },
            { name: 'Ibaretama' },
            { name: 'Ibiapina' },
            { name: 'Ibicuitinga' },
            { name: 'Icapuí' },
            { name: 'Icó' },
            { name: 'Iguatu' },
            { name: 'Independência' },
            { name: 'Ipaporanga' },
            { name: 'Ipaumirim' },
            { name: 'Ipu' },
            { name: 'Ipueiras' },
            { name: 'Iracema' },
            { name: 'Irauçuba' },
            { name: 'Itaiçaba' },
            { name: 'Itaitinga' },
            { name: 'Itapagé' },
            { name: 'Itapipoca' },
            { name: 'Itapiúna' },
            { name: 'Itarema' },
            { name: 'Itatira' },
            { name: 'Jaguaretama' },
            { name: 'Jaguaribara' },
            { name: 'Jaguaribe' },
            { name: 'Jaguaruana' },
            { name: 'Jardim' },
            { name: 'Jati' },
            { name: 'Jijoca de Jericoacoara' },
            { name: 'Juazeiro do Norte' },
            { name: 'Jucás' },
            { name: 'Lavras da Mangabeira' },
            { name: 'Limoeiro do Norte' },
            { name: 'Madalena' },
            { name: 'Maracanaú' },
            { name: 'Maranguape' },
            { name: 'Marco' },
            { name: 'Martinópole' },
            { name: 'Massapê' },
            { name: 'Mauriti' },
            { name: 'Meruoca' },
            { name: 'Milagres' },
            { name: 'Milhã' },
            { name: 'Miraíma' },
            { name: 'Missão Velha' },
            { name: 'Mombaça' },
            { name: 'Monsenhor Tabosa' },
            { name: 'Morada Nova' },
            { name: 'Moraújo' },
            { name: 'Morrinhos' },
            { name: 'Mucambo' },
            { name: 'Mulungu' },
            { name: 'Nova Olinda' },
            { name: 'Nova Russas' },
            { name: 'Novo Oriente' },
            { name: 'Ocara' },
            { name: 'Orós' },
            { name: 'Pacajus' },
            { name: 'Pacatuba' },
            { name: 'Pacoti' },
            { name: 'Pacujá' },
            { name: 'Palhano' },
            { name: 'Palmácia' },
            { name: 'Paracuru' },
            { name: 'Paraipaba' },
            { name: 'Parambu' },
            { name: 'Paramoti' },
            { name: 'Pedra Branca' },
            { name: 'Penaforte' },
            { name: 'Pentecoste' },
            { name: 'Pereiro' },
            { name: 'Pindoretama' },
            { name: 'Piquet Carneiro' },
            { name: 'Pires Ferreira' },
            { name: 'Poranga' },
            { name: 'Porteiras' },
            { name: 'Potengi' },
            { name: 'Potiretama' },
            { name: 'Quiterianópolis' },
            { name: 'Quixadá' },
            { name: 'Quixelô' },
            { name: 'Quixeramobim' },
            { name: 'Quixeré' },
            { name: 'Redenção' },
            { name: 'Reriutaba' },
            { name: 'Russas' },
            { name: 'Saboeiro' },
            { name: 'Salitre' },
            { name: 'Santa Quitéria' },
            { name: 'Santana do Acaraú' },
            { name: 'Santana do Cariri' },
            { name: 'São Benedito' },
            { name: 'São Gonçalo do Amarante' },
            { name: 'São João do Jaguaribe' },
            { name: 'São Luís do Curu' },
            { name: 'Senador Pompeu' },
            { name: 'Senador Sá' },
            { name: 'Sobral' },
            { name: 'Solonópole' },
            { name: 'Tabuleiro do Norte' },
            { name: 'Tamboril' },
            { name: 'Tarrafas' },
            { name: 'Tauá' },
            { name: 'Tejuçuoca' },
            { name: 'Tianguá' },
            { name: 'Trairi' },
            { name: 'Tururu' },
            { name: 'Ubajara' },
            { name: 'Umari' },
            { name: 'Umirim' },
            { name: 'Uruburetama' },
            { name: 'Uruoca' },
            { name: 'Varjota' },
            { name: 'Várzea Alegre' },
            { name: 'Viçosa do Ceará' },
          ],
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
