const light = {
    backgroundColor: "#fff",
    contentBackgroundColor: "#f0f2f5;",
    textColor: "rgba(0, 0, 0, 0.64)",
    transition: "all .5s",
    primaryColor: "#DA0C79",
    secondaryColor: "#1CCCA3",
    primaryColorHover: "#45D5B3",
    successColor: "#52c41a",                        // success state color
    warningColor: "#FFE060",                      	// warning state color
    errorColor: "#F25F5C",                          // error state color
};

const dark = {
    backgroundColor: "#1a1a1a",
    contentBackgroundColor: "#2f2f2f",
    textColor: "#d9d9d9 !important",
    transition: "all .03s",
    primaryColor: "#DA0C79",
    secondaryColor: "#1CCCA3",
    primaryColorHover: "#45D5B3",
    successColor: "#52c41a",                        // success state color
    warningColor: "#faad14",                      	// warning state color
    errorColor: "#f5222d",                          // error state color
};


const themes = {"light": light, "dark": dark}

export { themes };