const getDataLS = (key) => {
  const data = localStorage.getItem(key);

  if (data) {
    return JSON.parse(data);
  } else {
    return false;
  }
};

const sendDataLS = (key, stdData) => {
  const data = localStorage.getItem(key);

  let lsData;
  if (data) {
    lsData = JSON.parse(data);
  } else {
    lsData = [];
  }

  lsData.push(stdData);
  localStorage.setItem(key, JSON.stringify(lsData));
};

const getSingleData = (key, id) => {
  const data = JSON.parse(localStorage.getItem(key));

  if (data) {
    return data.find((data) => data.id == id);
  } else {
    return false;
  }
};

const deleteSingleData = (key, id) => {
  const data = JSON.parse(localStorage.getItem(key));

  const deleteData = data.filter((item) => item.id != id);
  localStorage.setItem(key, JSON.stringify(deleteData));
};
