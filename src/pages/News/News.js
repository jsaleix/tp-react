import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './News.css'
import NewItem from '../../components/NewItem/NewItem';
import { NEWS_SEARCH, NEWS_FREE_SEARCH, NEWS_API_KEY } from '../../conf.js'; 

export default function News(){
    const [ loading, setLoading]    = useState(true);
    const [ lang, setLang ]         = useState("en");
    const [ search, setSearch ]     = useState("pokemon");
    const [ newsList, setNewsList]  = useState(null);
    var availableLang = ["en", "fr", "es", "ja", "kn", "ru", "de"];

    const fetchNews = async () => {
        setLoading(true);
        try{
            var res = await fetch(`${NEWS_SEARCH}?q=${search}&lang=${lang}&media=True&sort_by=relevancy`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": NEWS_API_KEY,
                    "x-rapidapi-host": "newscatcher.p.rapidapi.com"
                }
            })
            .then((res) => res.json())
            .catch((e) => {});
            console.log(res);
            setNewsList(res.articles);
        }catch(e){
            console.error(e)
        }
        setLoading(false);
    }

    const _renderNews = () => {
        if(newsList){
            return(
                <div className="news-cards">
                {newsList.map((news) => <NewItem key={news._id} data={news} />)}
                </div>
                
            )
        }
    }

    const _handleInput = (value, type) => {
        if(type === "search"){
            setSearch(value);
        }
        if(type === "lang"){
            setLang(value);
        }
    }

    useEffect(()=> {
        fetchNews();
    }, [lang, search]);

    return(
        <div className="news-div">
            <div className="container">
                <h2>NEWS LIST</h2>
            </div>
            <div className="filters-container">
                <div>
                    <label>Lang</label>
                    <select onChange={(e) => _handleInput(e.target.value, "lang")}>
                        {availableLang.map( (langOpt) => <option value={langOpt} checked={langOpt === lang ? true : false}>{langOpt}</option>)}

                    </select>                
                </div>

                <div>                
                    <label>Topic</label>
                    <input type="text" onChange={(e) => _handleInput(e.target.value, "search")} value={search}/>
                </div>
            </div>
            <section className="results">
                {_renderNews()}
            </section>
        </div>
    )
}