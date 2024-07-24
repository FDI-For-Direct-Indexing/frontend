import axios from "axios";
import * as cheerio from "cheerio";

const baseURL =
  "https://search.daum.net/search?w=news&nil_search=btn&DA=NTB&enc=utf8&cluster=y&cluster_page=1&q=";

export default async function GetNews(stockName) {
  const resp = await axios.get("https://search.daum.net/search", {
    params: {
      w: "news",
      cluster: "y",
      q: stockName,
      p: 1,
    },
  });
  const data = await resp.data;
  const $ = cheerio.load(data);
  const newsList = $("ul.c-list-basic > li");
  const newsParsed = newsList
    .map((i, el) => {
      return parseNews($(el));
    })
    .get();
  console.log(newsParsed);
  return newsParsed;
}

function parseNews(newsElem) {
  const press = newsElem.find(".c-tit-doc .tit_item").prop("title");
  const titleAnchor = newsElem.find(".c-item-content .item-title a");
  const title = titleAnchor.text();
  const url = titleAnchor.prop("href");
  const date = newsElem.find(".c-item-content .item-contents .txt-info").text();

  return {
    press,
    title,
    url,
    date,
  };
}
