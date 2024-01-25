import fetchData from '../http';
import getLevel from '../getlevel';

jest.mock('../http');

describe('getLevel function', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return current level if response status is ok', () => {
    const mockedResponse = { status: 'ok', level: 5 };
    fetchData.mockReturnValue(mockedResponse);

    const level = getLevel(123);

    expect(fetchData).toHaveBeenCalledWith('https://server/user/123');
    expect(level).toBe('Ваш текущий уровень: 5');
  });

  it('should return temporary unavailable message if response status is not ok', () => {
    const mockedResponse = { status: 'error' };
    fetchData.mockReturnValue(mockedResponse);

    const level = getLevel(123);

    expect(fetchData).toHaveBeenCalledWith('https://server/user/123');
    expect(level).toBe('Информация об уровне временно недоступна');
  });

  it('should throw an error if fetchData throws an error', () => {
    fetchData.mockImplementation(() => {
      throw new Error('Mocked error');
    });

    expect(() => {
      getLevel(123);
    }).toThrow('Mocked error');
  });
});
