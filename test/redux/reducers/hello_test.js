import { hello, initialState } from '../../../src/redux/reducers/hello';

describe('./redux/reducers/hello', () => {
  describe('CHANGE_NAME', () => {
    it('must change name', () => {
      const action = {
        type: 'CHANGE_NAME',
        payload: 'garry'
      };
      const result = hello(initialState, action);
      result.name.must.eql('garry');
    });
  });
});
