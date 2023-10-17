import { LanguageSelector } from '../../components/LanguageSelecter/LanguageSelector';
import { DataGrid, GridInitialState, useGridApiRef } from '@mui/x-data-grid';
import { BlogPostsContext } from '../../common/context/BlogPostsContext';
import { LanguageContext } from '../../common/context/LanguageContext';
import { BlogPostVote } from '../../components/Vote/BlogPostVote';
import { useTranslate } from '../../common/hooks/useTranslate';
import { StyledBlogPostsFeed } from './blogPostsFeed.style';
import { Filter } from '../../components/Filter/Filter';
import { SelectChangeEvent } from '@mui/material';
import { BlogPostRow } from '../../common/types';
import { Language } from '../../common/enums';
import React from 'react';


const initialState: GridInitialState = {
  pagination: {
    paginationModel: {
      page: 0,
      pageSize: 10
    }
  }
}

export const BlogPostsFeed = () => {
  const { blogPostsRows, setBlogPostsRows, loading } = React.useContext(BlogPostsContext);
  const { translatePage, loading: loadingTranslation } = useTranslate();
  const { language, setLanguage } = React.useContext(LanguageContext);
  const [quickFilter, setQuickFilter] = React.useState('');
  const apiRef = useGridApiRef();

  const columns = [
    {
      field: 'title', headerName: 'Title', flex: 12, sortable: false,
      renderCell: ({ row }: { row: BlogPostRow }) => row.title[language]
    },
    {
      field: 'body', headerName: 'Body', flex: 12, sortable: false,
      renderCell: ({ row }: { row: BlogPostRow }) => row.body[language]
    },
    {
      field: 'vote', headerName: '', flex: 1, sortable: false,
      renderCell: ({ row }: { row: BlogPostRow }) =>
        <BlogPostVote
          row={row}
          onVote={(updatedRow: BlogPostRow) => {
            const updatedRows = blogPostsRows.map((row: BlogPostRow) => {
              if (row.id !== updatedRow.id) return row;
              return updatedRow;
            });

            setBlogPostsRows(updatedRows);
          }}
        />
    }
  ];

  const translate = async (selectedLanguage: Language) => {
    const { page: currentPage, pageSize } = apiRef.current.state.pagination.paginationModel;
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedRows = filteredRows.slice(startIndex, endIndex);

    const translatedPage = await translatePage({ data: displayedRows, language: selectedLanguage });
    if (!translatedPage) return;

    // Update displayed rows with translations
    const translatedRows: BlogPostRow[] = [];
    displayedRows.forEach((_, i) => {
      const translatedRow = {
        ...displayedRows[i],
        title: {
          ...displayedRows[i].title,
          [selectedLanguage]: translatedPage?.data[i * 2].translations[0].text
        },
        body: {
          ...displayedRows[i].body,
          [selectedLanguage]: translatedPage?.data[(i * 2) + 1].translations[0].text
        }
      };

      const blogPostIndex = blogPostsRows.findIndex(({ id }) => id === translatedRow.id);
      blogPostsRows[blogPostIndex].title = translatedRow.title;
      blogPostsRows[blogPostIndex].body = translatedRow.body;
      translatedRows.push(translatedRow);
    })

    const updatedRows = [
      ...filteredRows.slice(0, startIndex),
      ...translatedRows,
      ...filteredRows.slice(endIndex, filteredRows.length)
    ];

    setBlogPostsRows(updatedRows);
    setLanguage?.(selectedLanguage);
  }

  const filteredRows = blogPostsRows.filter((row) => {
    return (
      row.title[language].toLowerCase().includes(quickFilter.toLowerCase()) ||
      row.body[language].toLowerCase().includes(quickFilter.toLowerCase())
    );
  });

  return (
    <StyledBlogPostsFeed>
      <h1>Suridata Blog</h1>
      <div className='data-grid-toolbar'>
        <div className='quick-filter-container'>
          <Filter onChange={(value) => {
            apiRef.current.setPage(0);
            setQuickFilter(value);
          }} />
        </div>
        <div className='translations-container'>
          <LanguageSelector onChange={(event: SelectChangeEvent) => {
            const selectedLanguage = event.target.value as Language;
            setLanguage?.(selectedLanguage);
            translate(selectedLanguage);
          }} />
        </div>
      </div>

      <div className='data-grid-container'>
        <DataGrid
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          disableColumnMenu
          onPaginationModelChange={() => translate(language)}
          rows={filteredRows}
          columns={columns}
          apiRef={apiRef}
          pageSizeOptions={[10]}
          sortModel={[]}
          loading={loading || loadingTranslation}
          initialState={initialState}
        />
      </div>
    </StyledBlogPostsFeed>
  );
}
