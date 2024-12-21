import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleWordCounterDto } from './dto/create-article-word-counter.dto';
import { UpdateArticleWordCounterDto } from './dto/update-article-word-counter.dto';
const axios = require('axios')
const fs = require('fs')
const htmlToJson = require('html-to-json');

@Injectable()
export class ArticleWordCounterService {

  async getList(query: any) {
    const { num } = query;

    const urlArrays = ['https://en.wikipedia.org/wiki/Python_(Programming_language)', 'https://en.wikipedia.org/wiki/Article_15', 'https://en.wikipedia.org/wiki/Concurrency_(computer_science)', 'https://en.wikipedia.org/wiki/Distributed_computing', 'https://en.wikipedia.org/wiki/Erlang_(programming_language)', 'https://en.wikipedia.org/wiki/Concurrent_computing', 'https://en.wikipedia.org/wiki/Parallel_computing', 'https://en.wikipedia.org/wiki/Gordon_Pask', 'https://en.wikipedia.org/wiki/Thread_(computing)', 'https://en.wikipedia.org/wiki/Computer_cluster']

    let wikiUrls = [];

    try {

      // It will push n number of urls to wikiUrls
      for (let i = 0; i < num; i++) {
        wikiUrls.push(urlArrays[i]);
      }

      // Promise.allSetteled for concurrent operations
      let axiosCalls: any = await Promise.allSettled(wikiUrls.map(url => {
        return axios.get(url)
      }))

      console.dir(axiosCalls," axios calls")

      let dataToWrite = '';

      for (let i = 0; i < axiosCalls.length; i++) {
        if (axiosCalls[i].status === 'rejected') { // if the axios call is rejecte then it will create a line with errors
          dataToWrite += `${wikiUrls[i]} failed. Due to : ${axiosCalls[i].reason} \n`
        } else if (axiosCalls[i].status === 'fulfilled') {  // if axios call is fullfilled then it will count the length of strings and write it in results.txt
          let url = axiosCalls[i].value.config.url;
          let data = axiosCalls[i].value.data;
          let count = JSON.parse(JSON.stringify(data)).length;
          dataToWrite += `${url}, ${count} \n`
        }
      } 

      // File creation
      // Creating the file based on data and count
      const d = fs.writeFile('results.txt', dataToWrite, (err, cb) => {
        if (err) {
          console.log(err);
        }
      })

    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return `File has been created successfully.`;
  }
}