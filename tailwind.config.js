module.exports = {
   purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}"],
   darkMode: "class", // false or 'media' or 'class'
   theme: {
      extend: {
         backgroundColor: {
            primary: {
               50: "#394968",
               100: "#121011",
               150: "#141414",
               250: "#444e60",
               350: "#364A63",
               450: "#8094AE",
               500: "#EFF2F7",
               550: "#4F5A5C",
               600: "#303034",
            },
            secondary: {
               50: "#CC3939",
               100: "#BF282C",
               150: "#c35d60",
               600: "#FF3B41",
            },
            gray: {
               25: "#F5F6FA",
               50: "#DBDFEA",
               150: '#BDC1CA',
               250: "#677994",
               350: "#E5E5E5",
               450: "#F5F7FA",
               550: "#E5E9F2",
               650: "#3C3C4C",
               750: "#E2B1A6",
               850: "#242424B5",
               950: "#F2F3F7",
            },
            tertiary: {
               100: "#52D2EE",
               200: "#38BCD9",
               300: "#40AAD7",
            },
            blue: {
               50: "#1E6CB5",
               150: "#A6E2CE",
            },
            yellow: {
               50: "#EEB82F",
            },
            green: {
               50: "#25B888",
            },
            maroon: {
               100: "#804437",
            },
            red: {
               50: "#FFE9E9",
               450: "#F1383E",
            },
         },
         borderColor: {
            primary: "#CED5E1",
            secondary: {
               100: "#E5E9F2",
               150: "#BF282C",
            },
            tertiary: {
               200: "#38BCD9",
            },
         },
         textColor: {
            primary: {
               50: "#394968",
               100: "#1C2632",
               150: "#283142",
               250: "#444e60",
               350: "#364A63",
               450: "#8094AE",
               500: "#081933",
               550: "#2C292C",
               600: "#111111",
               650: "#151415",
               700: "#181718",
               750: "#212121",
               850: "#808080",
            },
            secondary: {
               50: "#F1383E",
               100: "#BF282C",
               150: "#EA2026",
               250: "#AF2125",
               300: "#BE282C",
               350: "#B4262A",
               450: "#CA3438",
               500: "#FFABAB",
               550: "#cc3939",
               600: "#FF3B41",
            },
            gray: {
               50: "#CED5E1",
               150: "#737F92",
               250: "#677994",
               350: "#E3E3E3",
               450: "#C8D1E4",
               550: "#637183",
               650: "#3C3C4C",
               750:'#BDC1CA'
            },
            tertiary: {
               100: "#52D2EE",
               200: "#38BCD9",
               300: "#40AAD7",
            },
            blue: {
               50: "#1E6CB5",
            },
            yellow: {
               50: "#EEB82F",
            },
            green: {
               50: "#25B888",
            },
         },
         fontFamily: {
            primary: ["Nunito", "sans-serif"],
            secondary: ["Roboto", "sans-serif"],
         },
         fontSize: {
            xxs: "10px",
            xsm: "13px",
            md: "15px",
         },
         spacing: {
            100: "28rem",
         },
         screens: {
            print: { raw: "print" },
         },
         gradientColorStops: {
            primary: {
               100: "#F1C450",
               200: "#BE6819",
            },
            secondary: {
               100: "#4AC49C",
               200: "#1A7177",
            },
            tertiary: {
               100: "#4485C2",
               200: "#1B4E7D",
            },
            red: {
               10: "#D55D5D",
               20: "#7A1137",
            },
         },
         gridTemplateColumns: {
            16: "repeat(16, minmax(0, 1fr))",
         },
         transitionProperty: {
            maxHeight: "max-height",
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [],
};
