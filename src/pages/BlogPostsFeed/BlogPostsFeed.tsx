import { LanguageSelector } from '../../components/LanguageSelecter/LanguageSelector';
import { DataGrid, GridInitialState, useGridApiRef } from '@mui/x-data-grid';
import { BlogPostVote } from '../../components/BlogPostVote/BlogPostVote';
import { useBlogPosts, useTranslate } from '../../common/hooks';
import { StyledBlogPostsFeed } from './blogPostsFeed.style';
import { Filter } from '../../components/Filter/Filter';
import { formatBlogPosts } from './blogPostsFeed.utils';
import { LanguageContext } from '../../common/context';
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
  const [blogPostsRows, setBlogPostsRows] = React.useState<BlogPostRow[]>([]);
  const [filteredRows, setFilteredRows] = React.useState<BlogPostRow[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { language, setLanguage } = React.useContext(LanguageContext);
  const [quickFilter, setQuickFilter] = React.useState('');
  const { translateBlogPostsRows } = useTranslate();
  const { fetchBlogPosts } = useBlogPosts();
  const apiRef = useGridApiRef();

  React.useEffect(() => {
    setIsLoading(true);
    fetchBlogPosts()
      .then((res: any) => {
        setIsLoading(false);
        const blogPostsRows = formatBlogPosts(res.data);
        setBlogPostsRows(blogPostsRows);
        setFilteredRows(blogPostsRows);
      })
      .catch(error => {
        console.error('Error fetching blog posts: ', error);
        setIsLoading(false);
      })
  }, []);

  React.useEffect(() => {
    const filteredRows = JSON.parse(JSON.stringify(blogPostsRows)).filter((row: BlogPostRow) => {
      return (
        row.title[language].toLowerCase().includes(quickFilter.toLowerCase()) ||
        row.body[language].toLowerCase().includes(quickFilter.toLowerCase())
      );
    });

    setFilteredRows(filteredRows);
  }, [quickFilter]);

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
        <BlogPostVote row={row} />
    }
  ];

  const translate = async (selectedLanguage: Language) => {
    const { page: currentPage, pageSize } = apiRef.current.state.pagination.paginationModel;
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedRows = filteredRows.slice(startIndex, endIndex);

    setIsLoading(true);

    const translatedRows = await translateBlogPostsRows(displayedRows, selectedLanguage);
    if (!translatedRows) {
      setIsLoading(false);
      return;
    }

    // Update displayed rows with translations
    const { data } = translatedRows;
    displayedRows.forEach((displayedRow: BlogPostRow, i: number) => {

      displayedRow.title[selectedLanguage] = data[i * 2].translations[0].text;
      displayedRow.body[selectedLanguage] = data[(i * 2) + 1].translations[0].text;
    })
    setIsLoading(false);
  }

  return (
    <StyledBlogPostsFeed>
      <h1>Suridata Blog</h1>
      <div className='data-grid-toolbar'>
        <div className='quick-filter-container'>
          <Filter onChange={value => setQuickFilter(value)} />
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
          loading={isLoading}
          initialState={initialState}
        />
      </div>
    </StyledBlogPostsFeed>
  );
}
