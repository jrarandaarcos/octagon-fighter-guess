
export interface Fighter {
  id: number;
  name: string;
  country: string;
  division: string;
  debutYear: number;
  debutEvent: string;
  record: string; // Format: "W-L-D"
  fightingStyle: string;
}

// 100 UFC fighters with updated information for 2025
export const fighters: Fighter[] = [
  {
    id: 1,
    name: "Jon Jones",
    country: "United States",
    division: "Heavyweight",
    debutYear: 2008,
    debutEvent: "UFC 87",
    record: "27-1-0",
    fightingStyle: "Wrestling, Striking"
  },
  {
    id: 2,
    name: "Islam Makhachev",
    country: "Russia",
    division: "Lightweight",
    debutYear: 2015,
    debutEvent: "UFC 187",
    record: "26-1-0",
    fightingStyle: "Sambo, Wrestling"
  },
  {
    id: 3,
    name: "Alex Pereira",
    country: "Brazil",
    division: "Light Heavyweight",
    debutYear: 2021,
    debutEvent: "UFC 268",
    record: "12-2-0",
    fightingStyle: "Kickboxing"
  },
  {
    id: 4,
    name: "Leon Edwards",
    country: "Jamaica",
    division: "Welterweight",
    debutYear: 2014,
    debutEvent: "UFC Fight Night 56",
    record: "22-3-0",
    fightingStyle: "Kickboxing, MMA"
  },
  {
    id: 5,
    name: "Dricus Du Plessis",
    country: "South Africa",
    division: "Middleweight",
    debutYear: 2020,
    debutEvent: "UFC Fight Night 179",
    record: "21-2-0",
    fightingStyle: "Kickboxing, Wrestling"
  },
  {
    id: 6,
    name: "Alexandre Pantoja",
    country: "Brazil",
    division: "Flyweight",
    debutYear: 2017,
    debutEvent: "UFC 216",
    record: "27-5-0",
    fightingStyle: "BJJ"
  },
  {
    id: 7,
    name: "Ilia Topuria",
    country: "Spain",
    division: "Featherweight",
    debutYear: 2020,
    debutEvent: "UFC Fight Night 179",
    record: "15-0-0",
    fightingStyle: "BJJ, Boxing"
  },
  {
    id: 8,
    name: "Sean O'Malley",
    country: "United States",
    division: "Bantamweight",
    debutYear: 2017,
    debutEvent: "Dana White's Contender Series 2",
    record: "19-1-0",
    fightingStyle: "Striking, Kickboxing"
  },
  {
    id: 9,
    name: "Alexa Grasso",
    country: "Mexico",
    division: "Women's Flyweight",
    debutYear: 2016,
    debutEvent: "UFC Fight Night 98",
    record: "17-3-1",
    fightingStyle: "Boxing"
  },
  {
    id: 10,
    name: "Zhang Weili",
    country: "China",
    division: "Women's Strawweight",
    debutYear: 2018,
    debutEvent: "UFC 227",
    record: "25-3-0",
    fightingStyle: "Kickboxing, Wrestling"
  },
  {
    id: 11,
    name: "Julianna Peña",
    country: "United States",
    division: "Women's Bantamweight",
    debutYear: 2013,
    debutEvent: "The Ultimate Fighter 18 Finale",
    record: "12-5-0",
    fightingStyle: "Wrestling, BJJ"
  },
  {
    id: 12,
    name: "Khamzat Chimaev",
    country: "Sweden",
    division: "Middleweight",
    debutYear: 2020,
    debutEvent: "UFC Fight Night 172",
    record: "14-0-0",
    fightingStyle: "Wrestling, Sambo"
  },
  {
    id: 13,
    name: "Dustin Poirier",
    country: "United States",
    division: "Lightweight",
    debutYear: 2011,
    debutEvent: "UFC 125",
    record: "30-8-0",
    fightingStyle: "Boxing, BJJ"
  },
  {
    id: 14,
    name: "Max Holloway",
    country: "United States",
    division: "Featherweight",
    debutYear: 2012,
    debutEvent: "UFC 143",
    record: "26-7-0",
    fightingStyle: "Boxing, Kickboxing"
  },
  {
    id: 15,
    name: "Charles Oliveira",
    country: "Brazil",
    division: "Lightweight",
    debutYear: 2010,
    debutEvent: "UFC Live: Jones vs. Matyushenko",
    record: "34-10-0",
    fightingStyle: "BJJ, Muay Thai"
  },
  {
    id: 16,
    name: "Israel Adesanya",
    country: "Nigeria",
    division: "Middleweight",
    debutYear: 2018,
    debutEvent: "UFC 221",
    record: "24-3-0",
    fightingStyle: "Kickboxing"
  },
  {
    id: 17,
    name: "Robert Whittaker",
    country: "New Zealand",
    division: "Middleweight",
    debutYear: 2012,
    debutEvent: "UFC on FX 6",
    record: "26-7-0",
    fightingStyle: "Karate, Boxing"
  },
  {
    id: 18,
    name: "Belal Muhammad",
    country: "United States",
    division: "Welterweight",
    debutYear: 2016,
    debutEvent: "UFC Fight Night 83",
    record: "23-3-0",
    fightingStyle: "Wrestling, Boxing"
  },
  {
    id: 19,
    name: "Shavkat Rakhmonov",
    country: "Kazakhstan",
    division: "Welterweight",
    debutYear: 2020,
    debutEvent: "UFC 254",
    record: "18-0-0",
    fightingStyle: "Combat Sambo, Kickboxing"
  },
  {
    id: 20,
    name: "Colby Covington",
    country: "United States",
    division: "Welterweight",
    debutYear: 2014,
    debutEvent: "UFC Fight Night 48",
    record: "17-4-0",
    fightingStyle: "Wrestling"
  },
  {
    id: 21,
    name: "Francis Ngannou",
    country: "Cameroon",
    division: "Heavyweight",
    debutYear: 2015,
    debutEvent: "UFC on Fox 17",
    record: "17-3-0",
    fightingStyle: "Boxing"
  },
  {
    id: 22,
    name: "Brandon Moreno",
    country: "Mexico",
    division: "Flyweight",
    debutYear: 2016,
    debutEvent: "The Ultimate Fighter 24 Finale",
    record: "21-7-2",
    fightingStyle: "Boxing, BJJ"
  },
  {
    id: 23,
    name: "Kamaru Usman",
    country: "Nigeria",
    division: "Welterweight",
    debutYear: 2015,
    debutEvent: "The Ultimate Fighter 21 Finale",
    record: "20-3-0",
    fightingStyle: "Wrestling, Boxing"
  },
  {
    id: 24,
    name: "Valentina Shevchenko",
    country: "Kyrgyzstan",
    division: "Women's Flyweight",
    debutYear: 2015,
    debutEvent: "UFC on Fox 17",
    record: "23-5-0",
    fightingStyle: "Muay Thai, Boxing"
  },
  {
    id: 25,
    name: "Amanda Nunes",
    country: "Brazil",
    division: "Women's Bantamweight",
    debutYear: 2013,
    debutEvent: "UFC 163",
    record: "22-5-0",
    fightingStyle: "BJJ, Boxing"
  },
  {
    id: 26,
    name: "Tom Aspinall",
    country: "United Kingdom",
    division: "Heavyweight",
    debutYear: 2020,
    debutEvent: "UFC Fight Night 171",
    record: "14-3-0",
    fightingStyle: "BJJ, Boxing"
  },
  {
    id: 27,
    name: "Justin Gaethje",
    country: "United States",
    division: "Lightweight",
    debutYear: 2017,
    debutEvent: "UFC Fight Night 116",
    record: "24-5-0",
    fightingStyle: "Wrestling, Kickboxing"
  },
  {
    id: 28,
    name: "Deiveson Figueiredo",
    country: "Brazil",
    division: "Bantamweight",
    debutYear: 2017,
    debutEvent: "UFC Fight Night 109",
    record: "22-3-1",
    fightingStyle: "BJJ, Muay Thai"
  },
  {
    id: 29,
    name: "Paddy Pimblett",
    country: "United Kingdom",
    division: "Lightweight",
    debutYear: 2021,
    debutEvent: "UFC Fight Night 191",
    record: "21-3-0",
    fightingStyle: "BJJ, Kickboxing"
  },
  {
    id: 30,
    name: "Rose Namajunas",
    country: "United States",
    division: "Women's Flyweight",
    debutYear: 2014,
    debutEvent: "The Ultimate Fighter 20 Finale",
    record: "13-6-0",
    fightingStyle: "Karate, BJJ"
  },
  {
    id: 31,
    name: "Gilbert Burns",
    country: "Brazil",
    division: "Welterweight",
    debutYear: 2014,
    debutEvent: "UFC Fight Night 49",
    record: "22-7-0",
    fightingStyle: "BJJ, Boxing"
  },
  {
    id: 32,
    name: "Petr Yan",
    country: "Russia",
    division: "Bantamweight",
    debutYear: 2018,
    debutEvent: "UFC Fight Night 132",
    record: "16-5-0",
    fightingStyle: "Boxing, Muay Thai"
  },
  {
    id: 33,
    name: "Alexander Volkov",
    country: "Russia",
    division: "Heavyweight",
    debutYear: 2016,
    debutEvent: "UFC Fight Night 99",
    record: "36-10-0",
    fightingStyle: "Kickboxing"
  },
  {
    id: 34,
    name: "Jan Blachowicz",
    country: "Poland",
    division: "Light Heavyweight",
    debutYear: 2014,
    debutEvent: "UFC Fight Night 53",
    record: "29-10-1",
    fightingStyle: "Muay Thai, BJJ"
  },
  {
    id: 35,
    name: "Jiri Prochazka",
    country: "Czech Republic",
    division: "Light Heavyweight",
    debutYear: 2020,
    debutEvent: "UFC 251",
    record: "30-4-1",
    fightingStyle: "Muay Thai, Judo"
  },
  {
    id: 36,
    name: "Sean Strickland",
    country: "United States",
    division: "Middleweight",
    debutYear: 2014,
    debutEvent: "UFC 171",
    record: "28-6-0",
    fightingStyle: "Boxing, Kickboxing"
  },
  {
    id: 37,
    name: "Aljamain Sterling",
    country: "United States",
    division: "Bantamweight",
    debutYear: 2014,
    debutEvent: "UFC 170",
    record: "23-4-0",
    fightingStyle: "Wrestling, BJJ"
  },
  {
    id: 38,
    name: "Conor McGregor",
    country: "Ireland",
    division: "Lightweight",
    debutYear: 2013,
    debutEvent: "UFC on Fuel TV 9",
    record: "22-6-0",
    fightingStyle: "Boxing, Karate"
  },
  {
    id: 39,
    name: "Brian Ortega",
    country: "United States",
    division: "Featherweight",
    debutYear: 2014,
    debutEvent: "UFC on Fox 12",
    record: "15-3-0",
    fightingStyle: "BJJ, Boxing"
  },
  {
    id: 40,
    name: "Michael Chandler",
    country: "United States",
    division: "Lightweight",
    debutYear: 2021,
    debutEvent: "UFC 257",
    record: "23-8-0",
    fightingStyle: "Wrestling, Boxing"
  },
  {
    id: 41,
    name: "Holly Holm",
    country: "United States",
    division: "Women's Bantamweight",
    debutYear: 2015,
    debutEvent: "UFC 184",
    record: "15-6-0",
    fightingStyle: "Boxing, Kickboxing"
  },
  {
    id: 42,
    name: "Jessica Andrade",
    country: "Brazil",
    division: "Women's Flyweight",
    debutYear: 2013,
    debutEvent: "UFC on Fox 8",
    record: "25-12-0",
    fightingStyle: "Muay Thai, Wrestling"
  },
  {
    id: 43,
    name: "Carla Esparza",
    country: "United States",
    division: "Women's Strawweight",
    debutYear: 2014,
    debutEvent: "The Ultimate Fighter 20 Finale",
    record: "19-7-0",
    fightingStyle: "Wrestling"
  },
  {
    id: 44,
    name: "Marina Rodriguez",
    country: "Brazil",
    division: "Women's Strawweight",
    debutYear: 2018,
    debutEvent: "UFC Fight Night 131",
    record: "17-3-3",
    fightingStyle: "Muay Thai"
  },
  {
    id: 45,
    name: "Tatiana Suarez",
    country: "United States",
    division: "Women's Strawweight",
    debutYear: 2016,
    debutEvent: "The Ultimate Fighter 23 Finale",
    record: "10-0-0",
    fightingStyle: "Wrestling"
  },
  {
    id: 46,
    name: "Calvin Kattar",
    country: "United States",
    division: "Featherweight",
    debutYear: 2017,
    debutEvent: "UFC 214",
    record: "23-7-0",
    fightingStyle: "Boxing"
  },
  {
    id: 47,
    name: "Arnold Allen",
    country: "United Kingdom",
    division: "Featherweight",
    debutYear: 2015,
    debutEvent: "UFC Fight Night 69",
    record: "19-3-0",
    fightingStyle: "Boxing, BJJ"
  },
  {
    id: 48,
    name: "Movsar Evloev",
    country: "Russia",
    division: "Featherweight",
    debutYear: 2019,
    debutEvent: "UFC Fight Night 149",
    record: "17-0-0",
    fightingStyle: "Wrestling, Sambo"
  },
  {
    id: 49,
    name: "Magomed Ankalaev",
    country: "Russia",
    division: "Light Heavyweight",
    debutYear: 2018,
    debutEvent: "UFC Fight Night 127",
    record: "18-1-1",
    fightingStyle: "Combat Sambo"
  },
  {
    id: 50,
    name: "Bo Nickal",
    country: "United States",
    division: "Middleweight",
    debutYear: 2023,
    debutEvent: "UFC 285",
    record: "7-0-0",
    fightingStyle: "Wrestling"
  },
  {
    id: 51,
    name: "Raul Rosas Jr.",
    country: "Mexico",
    division: "Bantamweight",
    debutYear: 2022,
    debutEvent: "UFC 282",
    record: "10-1-0",
    fightingStyle: "BJJ, Wrestling"
  },
  {
    id: 52,
    name: "Joaquin Buckley",
    country: "United States",
    division: "Welterweight",
    debutYear: 2020,
    debutEvent: "UFC Fight Night 174",
    record: "18-6-0",
    fightingStyle: "Kickboxing"
  },
  {
    id: 53,
    name: "Jamahal Hill",
    country: "United States",
    division: "Light Heavyweight",
    debutYear: 2020,
    debutEvent: "UFC on ESPN 10",
    record: "12-1-0",
    fightingStyle: "Boxing, BJJ"
  },
  {
    id: 54,
    name: "Derrick Lewis",
    country: "United States",
    division: "Heavyweight",
    debutYear: 2014,
    debutEvent: "UFC on Fox 11",
    record: "27-11-0",
    fightingStyle: "Boxing"
  },
  {
    id: 55,
    name: "Curtis Blaydes",
    country: "United States",
    division: "Heavyweight",
    debutYear: 2016,
    debutEvent: "UFC Fight Night 86",
    record: "18-4-0",
    fightingStyle: "Wrestling, Boxing"
  },
  {
    id: 56,
    name: "Sergei Pavlovich",
    country: "Russia",
    division: "Heavyweight",
    debutYear: 2018,
    debutEvent: "UFC Fight Night 141",
    record: "18-2-0",
    fightingStyle: "Boxing, Kickboxing"
  },
  {
    id: 57,
    name: "Tai Tuivasa",
    country: "Australia",
    division: "Heavyweight",
    debutYear: 2017,
    debutEvent: "UFC Fight Night 121",
    record: "14-7-0",
    fightingStyle: "Boxing, Kickboxing"
  },
  {
    id: 58,
    name: "Ciryl Gane",
    country: "France",
    division: "Heavyweight",
    debutYear: 2019,
    debutEvent: "UFC Fight Night 156",
    record: "11-2-0",
    fightingStyle: "Muay Thai"
  },
  {
    id: 59,
    name: "Paulo Costa",
    country: "Brazil",
    division: "Middleweight",
    debutYear: 2017,
    debutEvent: "UFC Fight Night 106",
    record: "14-3-0",
    fightingStyle: "Muay Thai, BJJ"
  },
  {
    id: 60,
    name: "Dan Hooker",
    country: "New Zealand",
    division: "Lightweight",
    debutYear: 2014,
    debutEvent: "UFC Fight Night 43",
    record: "23-12-0",
    fightingStyle: "Kickboxing"
  },
  {
    id: 61,
    name: "Beneil Dariush",
    country: "Iran",
    division: "Lightweight",
    debutYear: 2014,
    debutEvent: "UFC Fight Night 35",
    record: "22-6-1",
    fightingStyle: "BJJ, Muay Thai"
  },
  {
    id: 62,
    name: "Rafael Fiziev",
    country: "Azerbaijan",
    division: "Lightweight",
    debutYear: 2019,
    debutEvent: "UFC Fight Night 152",
    record: "12-3-0",
    fightingStyle: "Muay Thai"
  },
  {
    id: 63,
    name: "Mateusz Gamrot",
    country: "Poland",
    division: "Lightweight",
    debutYear: 2020,
    debutEvent: "UFC Fight Island 1",
    record: "24-2-0",
    fightingStyle: "Wrestling, Boxing"
  },
  {
    id: 64,
    name: "Arman Tsarukyan",
    country: "Armenia",
    division: "Lightweight",
    debutYear: 2019,
    debutEvent: "UFC Fight Night 149",
    record: "21-3-0",
    fightingStyle: "Wrestling, Striking"
  },
  {
    id: 65,
    name: "Merab Dvalishvili",
    country: "Georgia",
    division: "Bantamweight",
    debutYear: 2017,
    debutEvent: "UFC Fight Night 114",
    record: "17-4-0",
    fightingStyle: "Wrestling, Striking"
  },
  {
    id: 66,
    name: "Henry Cejudo",
    country: "United States",
    division: "Bantamweight",
    debutYear: 2014,
    debutEvent: "UFC on Fox 13",
    record: "16-3-0",
    fightingStyle: "Wrestling, Boxing"
  },
  {
    id: 67,
    name: "Alexandre Pantoja",
    country: "Brazil",
    division: "Flyweight",
    debutYear: 2017,
    debutEvent: "UFC 216",
    record: "27-5-0",
    fightingStyle: "BJJ"
  },
  {
    id: 68,
    name: "Kai Kara-France",
    country: "New Zealand",
    division: "Flyweight",
    debutYear: 2018,
    debutEvent: "UFC Fight Night 142",
    record: "24-11-0",
    fightingStyle: "Kickboxing"
  },
  {
    id: 69,
    name: "Manon Fiorot",
    country: "France",
    division: "Women's Flyweight",
    debutYear: 2021,
    debutEvent: "UFC Fight Island 8",
    record: "11-1-0",
    fightingStyle: "Karate, Kickboxing"
  },
  {
    id: 70,
    name: "Yan Xiaonan",
    country: "China",
    division: "Women's Strawweight",
    debutYear: 2017,
    debutEvent: "UFC Fight Night 122",
    record: "18-3-0",
    fightingStyle: "Sanda, Wrestling"
  },
  {
    id: 71,
    name: "Taila Santos",
    country: "Brazil",
    division: "Women's Flyweight",
    debutYear: 2019,
    debutEvent: "UFC Fight Night 149",
    record: "19-2-0",
    fightingStyle: "Muay Thai, BJJ"
  },
  {
    id: 72,
    name: "Ketlen Vieira",
    country: "Brazil",
    division: "Women's Bantamweight",
    debutYear: 2016,
    debutEvent: "UFC Fight Night 96",
    record: "13-3-0",
    fightingStyle: "Judo, BJJ"
  },
  {
    id: 73,
    name: "Kayla Harrison",
    country: "United States",
    division: "Women's Bantamweight",
    debutYear: 2023,
    debutEvent: "UFC 300",
    record: "18-1-0",
    fightingStyle: "Judo, Wrestling"
  },
  {
    id: 74,
    name: "Alexander Volkanovski",
    country: "Australia",
    division: "Featherweight",
    debutYear: 2016,
    debutEvent: "UFC Fight Night 101",
    record: "26-4-0",
    fightingStyle: "Wrestling, Boxing"
  },
  {
    id: 75,
    name: "Dominick Cruz",
    country: "United States",
    division: "Bantamweight",
    debutYear: 2011,
    debutEvent: "UFC 132",
    record: "24-4-0",
    fightingStyle: "Wrestling, Boxing"
  },
  {
    id: 76,
    name: "Cory Sandhagen",
    country: "United States",
    division: "Bantamweight",
    debutYear: 2018,
    debutEvent: "UFC Fight Night 126",
    record: "17-4-0",
    fightingStyle: "Kickboxing, BJJ"
  },
  {
    id: 77,
    name: "Rob Font",
    country: "United States",
    division: "Bantamweight",
    debutYear: 2014,
    debutEvent: "UFC 175",
    record: "20-7-0",
    fightingStyle: "Boxing"
  },
  {
    id: 78,
    name: "Marlon Vera",
    country: "Ecuador",
    division: "Bantamweight",
    debutYear: 2014,
    debutEvent: "UFC 180",
    record: "22-8-1",
    fightingStyle: "Muay Thai, BJJ"
  },
  {
    id: 79,
    name: "Aleksandar Rakic",
    country: "Austria",
    division: "Light Heavyweight",
    debutYear: 2017,
    debutEvent: "UFC Fight Night 115",
    record: "14-4-0",
    fightingStyle: "Kickboxing"
  },
  {
    id: 80,
    name: "Anthony Smith",
    country: "United States",
    division: "Light Heavyweight",
    debutYear: 2013,
    debutEvent: "UFC on Fuel TV 10",
    record: "37-19-0",
    fightingStyle: "Kickboxing, BJJ"
  },
  {
    id: 81,
    name: "Nikita Krylov",
    country: "Ukraine",
    division: "Light Heavyweight",
    debutYear: 2013,
    debutEvent: "UFC 164",
    record: "29-10-0",
    fightingStyle: "Kickboxing, Sambo"
  },
  {
    id: 82,
    name: "Johnny Walker",
    country: "Brazil",
    division: "Light Heavyweight",
    debutYear: 2018,
    debutEvent: "UFC Fight Night 140",
    record: "21-8-0",
    fightingStyle: "Muay Thai, BJJ"
  },
  {
    id: 83,
    name: "Stephen Thompson",
    country: "United States",
    division: "Welterweight",
    debutYear: 2012,
    debutEvent: "UFC 143",
    record: "17-7-1",
    fightingStyle: "Karate, Kickboxing"
  },
  {
    id: 84,
    name: "Neil Magny",
    country: "United States",
    division: "Welterweight",
    debutYear: 2013,
    debutEvent: "UFC 157",
    record: "28-11-0",
    fightingStyle: "Boxing, Wrestling"
  },
  {
    id: 85,
    name: "Jack Della Maddalena",
    country: "Australia",
    division: "Welterweight",
    debutYear: 2022,
    debutEvent: "UFC 270",
    record: "16-2-0",
    fightingStyle: "Boxing, BJJ"
  },
  {
    id: 86,
    name: "Ian Machado Garry",
    country: "Ireland",
    division: "Welterweight",
    debutYear: 2021,
    debutEvent: "UFC 268",
    record: "14-0-0",
    fightingStyle: "Kickboxing, Karate"
  },
  {
    id: 87,
    name: "Derek Brunson",
    country: "United States",
    division: "Middleweight",
    debutYear: 2012,
    debutEvent: "UFC 155",
    record: "23-9-0",
    fightingStyle: "Wrestling"
  },
  {
    id: 88,
    name: "Darren Till",
    country: "United Kingdom",
    division: "Middleweight",
    debutYear: 2015,
    debutEvent: "UFC Fight Night 67",
    record: "18-5-1",
    fightingStyle: "Muay Thai"
  },
  {
    id: 89,
    name: "Kevin Holland",
    country: "United States",
    division: "Welterweight",
    debutYear: 2018,
    debutEvent: "UFC 227",
    record: "25-10-0",
    fightingStyle: "Striking, BJJ"
  },
  {
    id: 90,
    name: "Edmen Shahbazyan",
    country: "United States",
    division: "Middleweight",
    debutYear: 2018,
    debutEvent: "The Ultimate Fighter 28 Finale",
    record: "12-4-0",
    fightingStyle: "Boxing, Wrestling"
  },
  {
    id: 91,
    name: "Uriah Hall",
    country: "Jamaica",
    division: "Middleweight",
    debutYear: 2013,
    debutEvent: "The Ultimate Fighter 17 Finale",
    record: "18-11-0",
    fightingStyle: "Karate, Kickboxing"
  },
  {
    id: 92,
    name: "Corey Anderson",
    country: "United States",
    division: "Light Heavyweight",
    debutYear: 2014,
    debutEvent: "The Ultimate Fighter 19 Finale",
    record: "17-6-0",
    fightingStyle: "Wrestling"
  },
  {
    id: 93,
    name: "Chris Weidman",
    country: "United States",
    division: "Middleweight",
    debutYear: 2011,
    debutEvent: "UFC on Versus 3",
    record: "16-7-0",
    fightingStyle: "Wrestling, BJJ"
  },
  {
    id: 94,
    name: "Irene Aldana",
    country: "Mexico",
    division: "Women's Bantamweight",
    debutYear: 2016,
    debutEvent: "UFC on Fox 22",
    record: "14-7-0",
    fightingStyle: "Boxing"
  },
  {
    id: 95,
    name: "Mackenzie Dern",
    country: "United States",
    division: "Women's Strawweight",
    debutYear: 2018,
    debutEvent: "UFC 222",
    record: "13-4-0",
    fightingStyle: "BJJ"
  },
  {
    id: 96,
    name: "Cub Swanson",
    country: "United States",
    division: "Featherweight",
    debutYear: 2011,
    debutEvent: "UFC on Fox 1",
    record: "29-13-0",
    fightingStyle: "Kickboxing, BJJ"
  },
  {
    id: 97,
    name: "Jose Aldo",
    country: "Brazil",
    division: "Bantamweight",
    debutYear: 2011,
    debutEvent: "UFC 129",
    record: "31-8-0",
    fightingStyle: "Muay Thai, BJJ"
  },
  {
    id: 98,
    name: "Edson Barboza",
    country: "Brazil",
    division: "Featherweight",
    debutYear: 2010,
    debutEvent: "UFC 123",
    record: "24-11-0",
    fightingStyle: "Muay Thai"
  },
  {
    id: 99,
    name: "Tony Ferguson",
    country: "United States",
    division: "Lightweight",
    debutYear: 2011,
    debutEvent: "The Ultimate Fighter 13 Finale",
    record: "26-10-0",
    fightingStyle: "Wrestling, Boxing"
  },
  {
    id: 100,
    name: "Michael Chiesa",
    country: "United States",
    division: "Welterweight",
    debutYear: 2012,
    debutEvent: "The Ultimate Fighter 15 Finale",
    record: "18-7-0",
    fightingStyle: "BJJ, Wrestling"
  }
];
