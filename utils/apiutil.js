"use strict";
var HOST_URI = "https://www.hahajok.com";

var GET_OPENID = "/user/openid.json";

var UPLOAD_USERINFO = "/user/infos.json";

var JOKER_LATESTS = "/jokers/latests.json";

var JOKER_INFO = "/jokers/{}/info.json";

var JOKER_HOTS = "/jokers/hots.json";

var JOKER_CLASSIFICATION_LIST = "/jokers/classification/{}/list.json";

var CLASSIFICATION_LIST = "/classification/list.json";


var UPLOAD_REPLIES = "/replices.json";

var REPLIES_LIST_BY_JOKERID = "/replies/jokers/{}/list.json"

function _obj2uri(obj){
    return Object.keys(obj).map(function(k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]);
    }).join("&");
}

function wxRequest(url, method, data) {
  console.info('request:', method, url, data)
    return new Promise(function(resolve, reject) {
        wx.request({
            url: url,
            method: method,
            data: data,
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(resp) {
                resolve(resp)
            },
            fail: function(resp) {
                reject(resp)
            }
        })
    });
}

function getOpenID (query) {
    var getURL = HOST_URI + GET_OPENID;
    return wxRequest(getURL, 'POST', query);
}


function putUserInfo (data) {
    var putURL = HOST_URI + UPLOAD_USERINFO;
    return wxRequest(putURL, 'PUT', data);
}

function getLatests(query) {
    var getURL = HOST_URI + JOKER_LATESTS + "?" + _obj2uri(query);
    return wxRequest(getURL, 'GET', query);
}

function getHots(query) {
    var getURL = HOST_URI + JOKER_HOTS;
    return wxRequest(getURL, 'GET', query);
}

function getJoker(query) {
    var getURL = HOST_URI + JOKER_INFO;
    getURL = getURL.replace("{}", query.id);
    return wxRequest(getURL, 'GET', query);
}

function getClassification(query) {
    var getURL = HOST_URI + CLASSIFICATION_LIST + "?" + _obj2uri(query);
    return wxRequest(getURL, 'GET', query);
}

function getJokersByClassId(query) {
    var getURL = HOST_URI + JOKER_CLASSIFICATION_LIST;
    getURL = getURL.replace("{}", query.classId);
    return wxRequest(getURL, 'GET', query);
}

function postReplies(data) {
    var putURL = HOST_URI + UPLOAD_REPLIES;
    return wxRequest(getURL, 'POST', data);
}

function getRepliesByJokerId(query) {
    var getURL = HOST_URI + REPLIES_LIST_BY_JOKERID;
    getURL = getURL.replace("{}", query.id);
    return wxRequest(getURL, 'GET', {});
}

module.exports = {
    getOpenID: getOpenID,
    putUserInfo: putUserInfo,
    getJoker: getJoker,
    getLatests: getLatests,
    getHots: getHots,
    getJokersByClassId: getJokersByClassId,
    getClassification: getClassification,
    postReplies: postReplies,
    getRepliesByJokerId: getRepliesByJokerId
};
