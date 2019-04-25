const light = {
    // BASIC LAYOUT COLORS
    header: "#fff !important",
    background: "no-repeat fixed #f8f9fb !important",
    content: "#fff !important",
    contentOther: "#fafafa !important",
    contentRaised: "#f2f2f2 !important",

    // TEXT COLORS
    brightText: "#666 !important",
    defaultText: "#666 !important",

    // SHADOW & TRANSITION
    transition: "all .5s !important",
    boxShadow: "rgba(0,0,0,.04) 0 2px 6px 1px !important",

    // LINES
    border: "1px solid #f2f2f2 !important",

    // THEME COLORS
    primaryColor: "#40a9ff !important",
    secondaryColor: "#F33F47",
    primaryColorHover: "#3ED9DC",
    infoColor: "#1890ff",                           // info state color
    successColor: "#52c41a",                        // success state color
    warningColor: "#FFE060",                      	// warning state color
    errorColor: "#F25F5C",                          // error state color
};

const dark = {
    // BASIC LAYOUT COLORS
    header: "#202938 !important",
    background: "no-repeat fixed #1b212b !important",
    content: "#242a35 !important",
    contentOther: "#2a303c !important",
    contentRaised: "#3c424e !important",


    // TEXT COLORS
    brightText: "#d0d6e2 !important",
    defaultText: "#babfc9 !important",

    // SHADOW & TRANSITION
    transition: "all .03s !important",
    transitionFaster: "all 0s !important",
    boxShadow: "rgba(0,0,0,.2) 0 2px 8px 1px !important",

    // LINES
    border: "1px solid #3c424e",

    // THEME COLORS
    primaryColor: "#40a9ff !important",
    secondaryColor: "#F33F47",
    primaryColorHover: "#3ED9DC",
    infoColor: "#1890ff",                           // info state color
    successColor: "#52c41a",                        // success state color
    warningColor: "#faad14",                      	// warning state color
    errorColor: "#f5222d",                          // error state color
};


const themes = {"light": light, "dark": dark}

export { themes };