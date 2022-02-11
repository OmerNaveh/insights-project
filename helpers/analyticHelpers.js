exports.filteredArrayesByKeyword = (initialData, keywords) => {
  const FilteredOnlyKeyword = initialData.filter((paste) =>
    filterByKeywordsArray(paste, keywords)
  );
  const FilteredOutKeyword = initialData.filter(
    (paste) => !filterByKeywordsArray(paste, keywords)
  );
  return [FilteredOnlyKeyword, FilteredOutKeyword];
};
const filterByKeywordsArray = (paste, keywords) => {
  let containsKeyword = false;
  keywords.forEach((keyword) => {
    if (pasteContainsKeyWord(paste, keyword)) containsKeyword = true;
  });
  return containsKeyword;
};
const pasteContainsKeyWord = (paste, keyword) => {
  const titleContainsKeyword = paste.title.toLowerCase().includes(keyword);
  const contentContainsKeyword = paste.content.toLowerCase().includes(keyword);

  return titleContainsKeyword || contentContainsKeyword;
};
