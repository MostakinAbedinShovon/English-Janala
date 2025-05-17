// when clicking the FAQ button user will jump to the FAQ section
const FAQ_Button = document.getElementById("FAQ_Button"), FAQ_Section = document.getElementById("FAQ_Section");
FAQ_Button.addEventListener("click", function () {
    FAQ_Section.scrollIntoView({ behavior: "smooth" });
})

// when clicking the Learn button user will jump to the Vocabulary section
const Learn_Button = document.getElementById("Learn_Button"), Learn_Section = document.getElementById("Learn_Section");
Learn_Button.addEventListener("click", function () {
    Learn_Section.scrollIntoView({ behavior: "smooth" });
})

// Login Code Varification
function Varification() {
    const Login_Code = document.getElementById("Login_Code").value, Login_Name = document.getElementById("Login_Name").value;
    if (Login_Name == "") alert("Enter your name");
    else if (Login_Code != 123456) alert("Incorrect password");
    else {
        alert("Login Successful");
        const Navigation_Bar = document.getElementById("Navigation_Bar"), Banner_Section = document.getElementById("Banner_Section"), Learn_Section = document.getElementById("Learn_Section"), FAQ_Section = document.getElementById("FAQ_Section");
        Navigation_Bar.classList.remove("hidden"), Navigation_Bar.classList.add("flex");
        Banner_Section.classList.remove("flex"), Banner_Section.classList.add("hidden");
        Learn_Section.classList.remove("hidden"), Learn_Section.classList.add("flex");
        FAQ_Section.classList.remove("hidden"), FAQ_Section.classList.add("flex");
    }
}

// Logout Button
function Logout() {
    const Navigation_Bar = document.getElementById("Navigation_Bar"), Banner_Section = document.getElementById("Banner_Section"), Learn_Section = document.getElementById("Learn_Section"), FAQ_Section = document.getElementById("FAQ_Section");
    Navigation_Bar.classList.remove("flex"), Navigation_Bar.classList.add("hidden");
    Banner_Section.classList.remove("hidden"), Banner_Section.classList.add("flex");
    Learn_Section.classList.remove("flex"), Learn_Section.classList.add("hidden");
    FAQ_Section.classList.remove("flex"), FAQ_Section.classList.add("hidden");
}

// Create dynamically generated buttons from API-01 for each lesson
const Fetch_API_01 = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all').then((response) => response.json()).then((datas) => {
        const Lesson_Section = document.getElementById("Lesson_Section"), Button_Datas = datas.data;
        Button_Datas.forEach((Single_Button_Datas) => {
            const Single_Button_Data = Single_Button_Datas.level_no, Button = document.createElement("button");
            Button.classList.add("btn", "border-[#422AD5]", "text-sm", "psbe", "text-[#422AD5]", "hover:bg-[#422AD5]", "hover:text-white", "bg-white");
            Button.innerHTML = `<i class="fa-solid fa-book-open"></i>Lesson -${Single_Button_Data}`;
            Button.setAttribute("onClick", `Fetch_API_02(${Single_Button_Data},this)`);
            Lesson_Section.appendChild(Button);
        })
    })
};
Fetch_API_01();

// on Clicking a Specific Lesson Button Load All the words from API-02
const Fetch_API_02 = (Lesson_No, Button) => {
    // Hide Initial Empty Card Section
    const Initial_Empty_Card = document.getElementById("Initial_Empty_Card"), Empty_Card = document.getElementById("Empty_Card"), Loading_Spinner = document.getElementById("Loading_Spinner");
    // Loader Will Show
    Loading_Spinner.classList.remove("hidden"), Loading_Spinner.classList.add("flex");
    
    Initial_Empty_Card.classList.remove("flex"), Initial_Empty_Card.classList.add("hidden");

    // Active Button
    const Button_List = document.getElementById("Lesson_Section").querySelectorAll("button");
    Button_List.forEach((btn) => {
        btn.classList.remove("bg-[#422AD5]", "text-white");
        btn.classList.add("bg-white", "text-[#422AD5]");
    })

    Button.classList.remove("bg-white", "text-[#422AD5]");
    Button.classList.add("bg-[#422AD5]", "text-white");

    // Fetch Data & Create to Cards
    const url = `https://openapi.programming-hero.com/api/level/${Lesson_No}`;
    fetch(url).then((response) => response.json()).then((datas) => {
        const Card_Section = document.getElementById("Card_Section"), Card_Datas = datas.data;
        Card_Section.innerHTML = ``;

        if (!Card_Datas.length) Empty_Card.classList.remove("hidden"), Empty_Card.classList.add("flex");
        else {
            Empty_Card.classList.remove("flex"), Empty_Card.classList.add("hidden");
            Card_Section.classList.remove("hidden"), Card_Section.classList.add("grid");
            Card_Datas.forEach((Single_Card_Data) => {
                const Div = document.createElement("div");
                Div.classList.add("w-[547px]", "h-[372px]", "bg-white", "rounded-xl", "flex", "flex-col", "justify-center", "items-center");

                if (Single_Card_Data.meaning == null) {
                    Div.innerHTML = `
                    <h1 class="ibe text-[32px] mb-6">${Single_Card_Data.word}</h1>
                    <p class="ime text-xl mb-6">Meaning / Pronounciation</p>
                    <p class="hsbb text-[32px] text-[#494949] mb-14">"অর্থ নেই / ${Single_Card_Data.pronunciation}"</p>
                    <div id="Outer_Box_${Single_Card_Data.id}" class="flex gap-[332px]"></div>
                    `;
                }
                else if (Single_Card_Data.pronunciation == null) {
                    Div.innerHTML = `
                    <h1 class="ibe text-[32px] mb-6">${Single_Card_Data.word}</h1>
                    <p class="ime text-xl mb-6">Meaning / Pronounciation</p>
                    <p class="hsbb text-[32px] text-[#494949] mb-14">"${Single_Card_Data.meaning} / অর্থ নেই"</p>
                    <div id="Outer_Box_${Single_Card_Data.id}" class="flex gap-[332px]"></div>
                    `;
                }
                else {
                    Div.innerHTML = `
                    <h1 class="ibe text-[32px] mb-6">${Single_Card_Data.word}</h1>
                    <p class="ime text-xl mb-6">Meaning / Pronounciation</p>
                    <p class="hsbb text-[32px] text-[#494949] mb-14">"${Single_Card_Data.meaning} / ${Single_Card_Data.pronunciation}"</p>
                    <div id="Outer_Box_${Single_Card_Data.id}" class="flex gap-[332px]"></div>
                    `;
                }

                Fetch_API_03(Single_Card_Data.id);
                Card_Section.appendChild(Div);
            })
        }
    })
    // Loader Will Hide
    Loading_Spinner.classList.remove("flex"), Loading_Spinner.classList.add("hidden");
};

const Fetch_API_03 = (Single_Card_Data_id) => {
    const url = `https://openapi.programming-hero.com/api/word/${Single_Card_Data_id}`;
    fetch(url).then((response) => response.json()).then((datas) => {
        const Button = document.createElement("button"), Dialog = document.createElement("dialog"), Outer_Box_ID = document.getElementById(`Outer_Box_${Single_Card_Data_id}`), Sound_Button = document.createElement("button");
        Button.classList.add("btn", "w-14", "h-14", "rounded-lg", "bg-[#1a90ff18]", "border-0", "hover:bg-[#1a90ff2c]");
        Button.setAttribute("onclick", `modal_${datas.data.id}.showModal()`);
        Button.innerHTML = `
            <i class="fa-solid fa-circle-info fa-xl"></i>
        `;

        Sound_Button.classList.add("btn", "w-14", "h-14", "rounded-lg", "bg-[#1a90ff18]", "border-0", "hover:bg-[#1a90ff2c]");
        Sound_Button.innerHTML = `
            <i class="fa-solid fa-volume-high fa-xl"></i>
        `;

        Dialog.classList.add("modal");
        Dialog.setAttribute("id", `modal_${datas.data.id}`);
        let mean = datas.data.meaning;
        if (datas.data.meaning == null) mean = "অর্থ পাওয়া যায়নি";
        Dialog.innerHTML = `
        <div class="modal-box max-w-[735px] rounded-3xl p-6">
            <div class="border-2 border-[#EDF7FF] rounded-xl">
                <h1 class="psbe text-4xl mt-6 ml-6 mb-8">${datas.data.word} ( 
                    <i class="fa-solid fa-microphone-lines fa-xl"></i>
                        :${datas.data.pronunciation})</h1>
                <div class="ml-6 mb-8">
                    <p class="psbe text-2xl mb-[10px]">Meaning</p>
                    <p class="hmb text-2xl">${mean}</p>
                </div>
                <div class="ml-6 mb-8">
                    <p class="psbe text-2xl mb-[10px]">Example</p>
                    <p class="pre text-2xl">${datas.data.sentence}</p>
                </div>
                <div class="ml-6 mb-8">
                    <p class="hmb text-2xl mb-[10px]">সমার্থক শব্দ গুলো</p>
                    <div id="Box_${datas.data.id}" class="flex gap-[18px]"></div>
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button class="btn bg-[#422AD5] hrb text-2xl w-[269px] h-[52px] px-[35.5px] rounded-xl text-center text-white mt-6 hover:bg-[#3825b3]">Complete Learning</button>
            </form>
        </div>
        `;
        Outer_Box_ID.appendChild(Button), Outer_Box_ID.appendChild(Dialog), Outer_Box_ID.appendChild(Sound_Button);

        datas.data.synonyms.forEach((synonym) => {
            const Div = document.createElement("div"), Box_ID = document.getElementById(`Box_${datas.data.id}`);
            Div.classList.add("flex", "justify-center", "items-center", "px-5", "w-auto", "h-[52px]", "bg-[#D7E4EF]", "rounded-md");
            Div.innerHTML = `
            <p class="pre text-xl">${synonym}</p>
            `;
            Box_ID.appendChild(Div);
        })
    })
}