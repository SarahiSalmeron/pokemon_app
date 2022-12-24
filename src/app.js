const pokecard = document.getElementById("cards");
const buttons = document.getElementById("buttons");
const info = document.getElementById("info");
const allAbilities = document.getElementById("abilities"); 
let url = "https://pokeapi.co/api/v2/pokemon";
let buttonNext;
let buttonPrev;

let template;

const FetchPokemon = async (url) => {
    try{
        const res = await fetch(url);
        const resul = await res.json();
        PokemonDataGroup(resul.results);

        buttonNext = resul.next ? `<button class="bttn" id="bttn1" data-url=${resul.next}>→</button>` : ``;
        buttonPrev = resul.previous ? `<button class="bttn" id="bttn2" data-url=${resul.previous}>←</button>` : ``;
        buttons.innerHTML = buttonPrev + " " + buttonNext;

    } catch (e){
        console.log(e);
    }
}

FetchPokemon(url);

const PokemonDataGroup = async (data) => {
    pokecard.innerHTML = "";
    template = "";

    try{
        for (let index of data){
            const res = await fetch(index.url);
            const resul = await res.json();
            template = `
                <div class="card">
                    <div class="cardTop">
                        <img src="../public/pokeball.png" 
                            alt="Pokeball"
                            width="25px"/>
                        <h3 class="pokemonId">No. ${resul.id}</h3>
                    </div>
            
                    <div class="cardBottom">
                        <img src=${resul.sprites.front_default}
                            alt="pokemon sprite"
                            class="pokemonSprite"/>
                        <h2 class="pokemonName">${resul.name}</h2>
                    </div>
                </div>
            `;
            pokecard.innerHTML += template;
        }
        
    } catch (e){
        console.log(e);
    }
}

const PokemonDataId = async (id) => {
    template = "";

    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const resul = await res.json();

        const des = await fetch(resul.species.url);
        const desData = await des.json();

        if(resul.types[1]){
            const type2 = resul.types[1].type.name;

            template = `
                <div class="infoTop">
                    <div class="pokemonOfficialArt">
                        <img src=${resul.sprites.front_default}
                            alt="Official Artwork"
                            width="80px"
                        />
                    </div>
                    <div class="infoMainData">
                        <h3>No. ${resul.id}</h2>
                        <h2>${resul.name}</h2>
                        <div class="infoTypes">
                            <h4>${resul.types[0].type.name}</h4>
                            <h4>${resul.types[1].type.name}</h4>
                        </div>
                    </div>
                </div>

                <div class="infoDescription">
                    <p>${desData.flavor_text_entries[6].flavor_text}</p>
                </div>

                <div class="infoBasicStats">
                    <div class="basicStat">
                        <h4>EXP</h4>
                        <h4>${resul.base_experience}</h4>
                    </div>
                <div class="basicStat">
                    <h4>WEIGHT</h4>
                    <h4>${resul.weight}</h4>
                </div>
                <div class="basicStat">
                    <h4>HEIGHT</h4>
                    <h4>${resul.height}</h4>
                </div>
            </div>

            <div class="infoSA">
                <div class="infoAllStats">
                    <p><b>HP:</b> ${resul.stats[0].base_stat}</p>
                    <p><b>ATK:</b> ${resul.stats[1].base_stat}</p>
                    <p><b>DEF:</b> ${resul.stats[2].base_stat}</p>
                    <p><b>SATK:</b> ${resul.stats[3].base_stat}</p>
                    <p><b>SDEF:</b> ${resul.stats[4].base_stat}</p>
                    <p><b>SPD:</b> ${resul.stats[5].base_stat}</p>
                </div>
                <div class="infoAbilities">
                    <h4>ABILITIES</h4>
                    <div id="abilities">
                    </div>
                </div>
            </div>
            `;

        } else {
            template = `
                <div class="infoTop">
                    <div class="pokemonOfficialArt">
                        <img src=${resul.sprites.front_default}
                            alt="Official Artwork"
                            width="80px"
                        />
                    </div>
                    <div class="infoMainData">
                        <h3>No. ${resul.id}</h2>
                        <h2>${resul.name}</h2>
                        <div class="infoTypes">
                            <h4>${resul.types[0].type.name}</h4>
                        </div>
                    </div>
                </div>

                <div class="infoDescription">
                    <p>${desData.flavor_text_entries[6].flavor_text}</p>
                </div>

                <div class="infoBasicStats">
                    <div class="basicStat">
                        <h4>EXP</h4>
                        <h4>${resul.base_experience}</h4>
                    </div>
                    <div class="basicStat">
                        <h4>WEIGHT</h4>
                        <h4>${resul.weight}</h4>
                    </div>
                    <div class="basicStat">
                        <h4>HEIGHT</h4>
                        <h4>${resul.height}</h4>
                    </div>
                </div>

                <div class="infoSA">
                    <div class="infoAllStats">
                        <p><b>HP:</b> ${resul.stats[0].base_stat}</p>
                        <p><b>ATK:</b> ${resul.stats[1].base_stat}</p>
                        <p><b>DEF:</b> ${resul.stats[2].base_stat}</p>
                        <p><b>SATK:</b> ${resul.stats[3].base_stat}</p>
                        <p><b>SDEF:</b> ${resul.stats[4].base_stat}</p>
                        <p><b>SPD:</b> ${resul.stats[5].base_stat}</p>
                    </div>
                    <div class="infoAbilities">
                        <h4>ABILITIES</h4>
                        <div id="abilities">
                        </div>
                    </div>
                </div>
            `;
        }

        info.innerHTML = template;
        template = "";

        for (let i=0; i < resul.abilities.length; i++){
            template = `
                <p>${resul.abilities[i].ability.name}</p>
            `;
            abilities.innerHTML += template;
        }

    }catch (e){
        console.log(e);
    }
}

buttons.addEventListener('click', (e) => {
    if(e.target.classList.contains('bttn')){
        let value = e.target.dataset.url;
        console.log(value);
        FetchPokemon(value);
    }
})

pokecard.addEventListener('click', (e) => {
    if(e.target.classList.contains('card')){
        const pokeItem = e.target;
        const idGet = pokeItem.textContent.split("\n");
        const id = idGet[3].split("No. ");

        PokemonDataId(id[1]);
    }
})