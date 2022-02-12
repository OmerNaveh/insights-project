/**
 * split arrays into two arrays, filtered by keyswords
 *
 * @param initialData initial array of pastes.
 * @param keyswords array of keyswords
 * @return {[Paste[], Paste[]]}
 * first Paste[] contains only Pastes with at least one of the keywords
 * secend Paste[] contains only Pastes without any keywords
 */
exports.filteredArrayesByKeyword = (initialData, keywords) => {
  const FilteredOnlyKeyword = initialData.filter((paste) =>
    filterByKeywordsArray(paste, keywords)
  );
  const FilteredOutKeyword = initialData.filter(
    (paste) => !filterByKeywordsArray(paste, keywords)
  );
  return [FilteredOnlyKeyword, FilteredOutKeyword];
};

/**
 * Check if paste contains at least one keyword
 *
 * @param paste - object
 * @param keyswords - array of keyswords
 * @return {boolean} returns true if paste contains at least one of the keywords
 */
const filterByKeywordsArray = (paste, keywords) => {
  let containsKeyword = false;
  keywords.forEach((keyword) => {
    if (pasteContainsKeyWord(paste, keyword)) containsKeyword = true;
  });
  return containsKeyword;
};

/**
 * Check if paste contains keyword
 *
 * @param paste
 * @param {string} keysword
 * @return {boolean} returns true if paste contains keyword
 */
const pasteContainsKeyWord = (paste, keyword) => {
  const titleContainsKeyword = paste.title.toLowerCase().includes(keyword);
  const contentContainsKeyword = paste.content.toLowerCase().includes(keyword);

  return titleContainsKeyword || contentContainsKeyword;
};
