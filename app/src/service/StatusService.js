import { Status } from '../database/DatabaseModel';

export default {

  async addStatus(statusItem) {
    try {
      console.log(statusItem);
      await Status.create(statusItem);
    } catch (err) {
      console.log(err);
    }
  },

  async autoStatusItems() {
    let statusItemArr = [
      {
        statusId: 1,
        text: 'TODO',
        color: '#ff9900',
        projectId: '1',
        creatorId: '1',
        order: 1
      },
      {
        statusId: 2,
        text: 'IN PROGRESS',
        color: '#33ccff',
        projectId: '1',
        creatorId: '1',
        order: 2
      },
      {
        statusId: 3,
        text: 'DONE',
        color: '#33cc33',
        projectId: '1',
        creatorId: '1',
        order: 3
      }
    ];
    for (let statusItem of statusItemArr) {
      try {
        await Status.create(statusItem);
      } catch (err) {
        console.log(err);
      }
    }
  },

  async getStatusItemsByProject() {
    try {
      return await Status.findAll({ where: { projectId: '1' }, raw: true });
    } catch (err) {
      console.log('getStatusItemsByProject', err);
    }
  }
};