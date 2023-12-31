export const limitNumber = (value) => {
  if (value > 20) {
    value = 20;
  } else if (value < 2 || isNaN(value)) {
    value = 2;
  }
  return value;
};

const dictionary = {
  google: "구글",
  facebook: "페이스북",
  twitter: "트위터",
  github: "깃헙",
  microsoft: "마이크로소프트",
  kakao: "카카오",
  kakaotalk: "카카오톡",
  naver: "네이버",
};

/**
 *
 * @param {string} value
 * @returns 영어-> 한글
 */
export const convertToKorean = (prev) => {
  let value = prev.toLowerCase();
  if (dictionary[value] !== undefined) {
    return dictionary[value];
  } else {
    return prev;
  }
};

export const toScrollBottom = (query = ".output_box") => {
  const dom = document.querySelector(query);
  const height = dom.scrollHeight;
  dom.scrollTop = height;
};

export const pushInObject = (object, key, value) => {
  Object.defineProperty(object, key, {
    value: value,
    configurable: true,
    enumerable: true,
    writable: true,
  });
};

export const trueOrFalse = (condition = true, callback, reverse = false) => {
  let con = reverse ? false : true;
  if (condition) {
    callback(con);
  } else {
    callback(!con);
  }
};

export const callPathname = (value) => {
  if (value.pathname === undefined) {
    value = value.parentNode;
    value = callPathname(value);
  }
  return value;
};
