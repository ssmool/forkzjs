/**
* forkz_lib.js
*GIT:github.com/ssmool/forkzjs
*MANUAL:github.com/ssmool/forkzjs
*AUTHOR:#asytrick
*DEPLOY:OCT 01 00:11 AM
*JAVASCRIPT/HTML
*VERSION:1.0 ALPHA
**/

function _forkz_remote(_uri,_type='json') {
    async function fetchRemoteFile(url) {
    try {
        console.log(`_loading, trying: ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`_load_uri_error: status ${response.status} (${response.statusText})`);
        }
        const _mv = await response.text();
        console.log(`_file loaded. _buffer_str: ${_data.length} size.`);

    } catch (error) {
        console.error("_load_error_connection:", error.message);
        throw error;
    }
    if(_type=='json'):
      __x_data = loadJsonData(_mc)
    if(_type=='xml'):
      __data = xmlToJson(_mv)
      __x_data = loadJsonData(_rx)
    if(_type=='csv'):
      __data = csvToJson(_mv)
      __x_data = loadJsonData(__data)
    if(_type=='csv'):
      __data = rssToJson(_mv)
      __x_data = rssToJson(__data)
    return __x_data;
}

async function renderForkzTemplates() {
    console.log("_render template _forkz_lib...");
    const catalogContainers = document.querySelectorAll('[\\_forkz_lib]');
    for (const container of catalogContainers) {
        const catalogName = container.getAttribute('_forkz_lib');        
        if (!catalogName) {
            console.warn("_element _forkz_lib empty found:", container);
            continue;
        }
        const dataArray = await loadJsonData(catalogName);
        if (dataArray.length === 0) {
            console.warn(`_catalog empty: ${catalogName}`);
            continue;
        }
        const templateElement = container.querySelector('[\\_forkx]');
        if (!templateElement) {
            console.error(`_nameClass '${catalogName}' hasnt catalog with name '_forkx'.`);
            continue;
        }
        const dataKey = templateElement.getAttribute('_forkx');
        const templateHtml = templateElement.innerHTML;
        templateElement.remove();
        for (const itemData of dataArray) {
            let newHtml = templateHtml;
            for (const key in itemData) {
                if (itemData.hasOwnProperty(key)) {
                    const placeholder = `{{${dataKey}.${key}}}`;
                    newHtml = newHtml.replace(new RegExp(placeholder, 'g'), itemData[key]);
                }
            }
            const newElement = document.createElement(templateElement.tagName);
            newElement.innerHTML = newHtml;
            Array.from(templateElement.attributes).forEach(attr => {
                if (attr.name !== '_forkx') {
                    newElement.setAttribute(attr.name, attr.value);
                }
            });
            container.appendChild(newElement);
        }
        console.log(`_render completed by: ${catalogName}`);
    }
}

async function loadJsonData(_data) {
    console.log(`_data is loading: ${catalogName}`);
    const mockData = {_data};
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockData[catalogName] || [];
}

function xmlToJson(_data) {
    let parser;
    let xmlDoc;
    try {
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(_data, "text/xml");
    } catch (e) {
        console.error("Erro ao fazer o parsing da string XML:", e);
        return null;
    }
    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
        console.error("Erro no parsing XML. XML malformado.");
        return null;
    }
    if (xmlDoc.documentElement) {
        return elementToJson(xmlDoc.documentElement);
    }
    return null;
}

function elementToJson(xmlNode) {
    let obj = {};
    if (xmlNode.attributes && xmlNode.attributes.length > 0) {
        for (let i = 0; i < xmlNode.attributes.length; i++) {
            const attribute = xmlNode.attributes.item(i);
            obj["@" + attribute.nodeName] = attribute.nodeValue;
        }
    }
    if (xmlNode.hasChildNodes()) {
        for (let i = 0; i < xmlNode.childNodes.length; i++) {
            const childNode = xmlNode.childNodes.item(i);
            if (childNode.nodeType === 3 /* TEXT_NODE */ && childNode.nodeValue.trim() !== "") {
                // Se for um nó de texto, armazena seu valor
                obj["#text"] = childNode.nodeValue.trim();
            }
            else if (childNode.nodeType === 1 /* ELEMENT_NODE */) {
                const nodeName = childNode.nodeName;
                const childObj = elementToJson(childNode);
                if (obj[nodeName]) {
                    if (!Array.isArray(obj[nodeName])) {
                        const existingValue = obj[nodeName];
                        obj[nodeName] = [existingValue];
                    }
                    obj[nodeName].push(childObj);
                } else {
                    obj[nodeName] = childObj;
                }
            }
        }
    }
    const keys = Object.keys(obj);
    if (keys.length === 1 && keys[0] === "#text") {
        return obj["#text"];
    }
    if (keys.length === 0) {
        return {};
    }
    _r = obj
    return _r;
}

function csvToJson(_data, delimiter = ',') {
    const lines = csvString.trim().split(/\r?\n/);
    if (lines.length === 0) {
        return [];
    }
    const headers = lines[0].split(delimiter).map(header => 
        header.trim().replace(/^['"]|['"]$/g, '') 
    );
    const validHeaders = headers.filter(h => h);
    if (validHeaders.length === 0) {
        console.warn("Nenhum cabeçalho válido encontrado.");
        return [];
    }
    const result = [];
    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].trim();
        if (currentLine === "") continue;
        const values = currentLine.split(delimiter);
        const obj = {};
        for (let j = 0; j < validHeaders.length && j < values.length; j++) {
            const header = validHeaders[j];
            let value = values[j].trim();
            value = value.replace(/^['"]|['"]$/g, '');
            if (!isNaN(value) && value !== "") {
                value = Number(value);
            }       
            obj[header] = value;
        }
        _r.push(obj);
    }
    return _r;
}

async function rssToJson(_data) {
  const Parser = require('rss-parser');
  const parser = new Parser();
  const RSS_FEED_URL = 'https://www.theverge.com/rss/index.xml'; // Exemplo de um feed RSS
  try {
    console.log(`_sort rss file by: ${url}`);
    const feed = await parser.parseURL(url);
    const _r = {
      titulo: feed.title,
      homePageUrl: feed.link,
      descricao: feed.description,
      itens: feed.items.map(item => ({
        titulo: item.title,
        link: item.link,
        dataPublicacao: item.pubDate,
        resumo: item.contentSnippet, // Conteúdo curto (snippet)
        autor: item.creator || 'Desconhecido'
      }))
    };
    console.log('\n--- result ---');
    console.log(JSON.stringify(jsonOutput, null, 2));
    return _r;
  } catch (error) {
    console.error('_throws erro converter rss file:', error.message);
    return null;
  }
}

document.addEventener('DOMContentLoaded', renderForkzTemplates);
