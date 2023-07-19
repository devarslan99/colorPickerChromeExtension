const btn = document.querySelector(".pickButton");
const colorBox = document.querySelector(".colorBox");
const selectedColor = document.querySelector(".selectedColor");

btn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  //   console.log(tab);
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    async (resultsInjection) => {
      //console.log(resultsInjection);
      const [data] = resultsInjection;
      if (data.result) {
        const color = data.result.sRGBHex;
        colorBox.style.backgroundColor = color;
        selectedColor.innerText = color;
      }
    }
  );
});

const pickColor = async () => {
  try {
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
    //console.log(selectedColor);
  } catch (err) {
    console.log(err);
  }
};
