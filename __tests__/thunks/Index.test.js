import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as mazeActions from '../../src/js/actions/maze';
import * as UIActions from '../../src/js/actions/UI';
import * as thunks from '../../src/js/thunks';
import { initialState } from '../../src/js/reducers/maze';
import createInstance from '../../mock data/MazeHelper';
import data from '../../mock data/mazeData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mazeID = 'b9edcd1f-d65c-4330-ab64-8049fe323732';


describe('Thunks', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('resetState thunk', () => {
    it('should dispatch resetUI and resetMaze action creators ', () => {
      const expectedActions = [
        UIActions.resetUI(),
        mazeActions.resetMaze()
      ];

      const store = mockStore({ maze: initialState });
      store.dispatch(thunks.resetState());
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });

  describe('play thunk', () => {
    it('should dispatch updatePlayBtn and findPonyPath action creators ', () => {
      const expectedActions = [
        UIActions.updatePlayBtnUI(false),
        mazeActions.findPonyPath()
      ];

      const mazeHelper = createInstance();
      const maze = mazeHelper.build();
      const ponyPath = mazeHelper.findPath();
      const state = {
        ...initialState, maze, mazeHelper, ponyPath
      };

      const store = mockStore({ maze: state });
      store.dispatch(thunks.play());
      const actualActions = store.getActions();
      expect(actualActions).toEqual(expectedActions);
    });
  });

  describe('fetchMazeID', () => {
    it('should dispatch setProp("id", id) action creator', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            data: {
              maze_id: mazeID
            }
          }
        });
      });
      const expectedActions = [
        mazeActions.setProp('id', mazeID)
      ];

      const store = mockStore({ maze: initialState });
      store.dispatch(thunks.fetchMazeID());
      let actualActions;
      setTimeout(() => {
        actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
      }, 10);
    });
  });

  describe('fetchMaze thunk', () => {
    it('should dispatch ', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            data
          }
        });
      });

      const {
        data: cellData, pony, domokun, 'end-point': endPoint
      } = data;

      const store = mockStore({ maze: initialState });
      const expectedActions = [
        mazeActions.createMazeHelper(cellData, [pony, domokun, endPoint]),
        mazeActions.buildMaze(),
        UIActions.updateMazeUI(true),
        UIActions.updatePlayBtnUI(true),
        UIActions.updateOptionsUI(false)
      ];
      store.dispatch(thunks.fetchMazeID(mazeID));
      setTimeout(() => {
        const actualActions = store.getActions();
        expect(actualActions).toEqual(expectedActions);
      }, 20);
    });
  });
});
