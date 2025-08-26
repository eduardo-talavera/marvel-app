import { Comic } from "@/comics";

export const mockComics: Comic[] = [
    { 
      id: '1', 
      title: 'Ultimate Spider-Man (2000) #110 (Mark Bagley Variant)',
      thumbnail: {
        path :'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/4bc4947ea8f4d',
        extension:'jpg'
      },
      description: '',
        characters: {
          items: [
            {
              resourceURI: 'https://gateway.marvel.com/v1/public/characters/1011010',
              name: "Spider-Man (Ultimate)"
            }
          ]
        } 
    },
    { 
      id: '2', 
      title: 'Official Handbook of the Marvel Universe (2004) #10 (MARVEL KNIGHTS)',
      thumbnail: {
        path :'http://i.annihil.us/u/prod/marvel/i/mg/9/30/4bc64df4105b9',
        extension:'jpg'
      },
      description: '',
        characters: {
          items: [
            {
              resourceURI: 'https://gateway.marvel.com/v1/public/characters/111111',
              name: "Knights (Ultimate)"
            }
          ]
        } 
    },
    { 
      id: '3', 
      title: 'Official Handbook of the Marvel Universe (2004) #13 (TEAMS)',
      thumbnail: {
        path :'http://i.annihil.us/u/prod/marvel/i/mg/f/20/4bc63a47b8dcb',
        extension:'jpg'
      },
      description: '',
        characters: {
          items: [
            {
              resourceURI: 'https://gateway.marvel.com/v1/public/characters/111111',
              name: 'Handbook of the Marvel Universe (2004) #13'
            }
          ]
        } 
    },
  ];