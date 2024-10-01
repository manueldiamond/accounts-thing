import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#524AE0",
        'primary-dark': "#2B259C",
        grey:'#6D6D6D',
        '20':'#6D6D6D',
        'baby-text':'#6D6D6D', //redudundant, i know, but tell the figma colour names that not me.
        dark:'#202020',
        'dark-white':'#F6F6F6',
        'off-white':'#EFF0FF',
        '75':'#757792',
        '27A':'#27236A',
        'purple-highlight':'#D540E3',
        
        'light-purple':'#8A84FF',
        'lighter-off-white':'#F9F9FF',
        '29':"#292D32",

        error:'#AB2C10',
      'warning-dark':'#A35200',
        warning:'#EDC843',
        positive:'#069035',
        links:'#04021D',
        para:'#424242',
        head:'#232323',
        base:'#4C3DFF',

        dark2:'#232323',
        grey2:'#878787',
        
        light:'#FAFAFA',
        inactive:'#DCDCDC',
        'generic-white':'#F3F3F1',
        thick:'#000C14',
        'base-dark':'#05050F',
        '10':'#05050F',
        'light-texts':'#E4E4E4',

        'dark-grey':'#C3C3C3',

        gren:'#0D7C66',
        
      },
      
      fontFamily:{
        'wsans':'var(--work-sans)',
        'ssans':'var(--source-sans)'
      },
      fontSize:{
        'smol':'23px',
        'regular':'28px',
        'less-big':'40px',
        'big':'56px',
        
      },
    },
  },
  plugins: [],
};
export default config;
