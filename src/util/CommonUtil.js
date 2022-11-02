export const create7day = (now) => {
    const resultList = [];
    let day = now.add(-3, 'days');

    for (let i = 0; i < 7; i++) {
        resultList.push(day.add(i, 'days'));
    }

    return resultList;
};
