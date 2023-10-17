import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { DataGrid, GridInitialState, useGridApiRef } from '@mui/x-data-grid';
import { ErrorMessage } from '../../components/ErrorMessage/ErrorMessage';
import { BlogPostsContext } from '../../context/BlogPostsContext';
import { BlogPostVote } from '../../components/Vote/BlogPostVote';
import { StyledBlogPostsFeed } from './blogPostsFeed.style';
import { FranceSvg, SpainSvg, USASvg } from '../../assets';
import { Loading } from '../../components/Loading/Loading';
import { BlogLanguage } from '../../enums';
import { BlogPostRow } from '../../types';
import debounce from 'lodash/debounce';
import React from 'react';
import axios from 'axios';


const initialState: GridInitialState = {
  pagination: {
    paginationModel: {
      page: 0,
      pageSize: 10
    }
  }
}

const languagesOptions = [
  { language: BlogLanguage.English, icon: <USASvg /> },
  { language: BlogLanguage.Spanish, icon: <SpainSvg /> },
  { language: BlogLanguage.French, icon: <FranceSvg /> }
]

export const BlogPostsFeed = () => {
  const [selectedLanguage, setSelectedLanguage] = React.useState<BlogLanguage>(BlogLanguage.English);
  const { blogPostsRows, setBlogPostsRows, loading } = React.useContext(BlogPostsContext);
  const [filteredRows, setFilteredRows] = React.useState<BlogPostRow[]>([]);
  const [quickFilter, setQuickFilter] = React.useState('');
  const apiRef = useGridApiRef();

  React.useEffect(() => {
    if (blogPostsRows.length === 0) return;
    setFilteredRows(blogPostsRows);
  }, [blogPostsRows])

  if (loading) {
    return <Loading />;
  }

  if (!blogPostsRows) {
    return <ErrorMessage message={'Error fetching data'} />;
  }

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value === selectedLanguage) {
      return;
    }

    translatePosts(event.target.value as BlogLanguage);
  };

  const debouncedFilter = debounce((value) => {
    const filteredRows = blogPostsRows.filter((row) => {
      return (
        row.title[selectedLanguage].toLowerCase().includes(value.toLowerCase()) ||
        row.body[selectedLanguage].toLowerCase().includes(value.toLowerCase())
      );
    });

    setFilteredRows(filteredRows);
  }, 700);

  const handleQuickFilterChange = (event: any) => {
    setQuickFilter(event.target.value);
    debouncedFilter(event.target.value);
  };

  const columns = [
    {
      field: 'title', headerName: 'Title', flex: 12, sortable: false,
      renderCell: ({ row }: { row: BlogPostRow }) => row.title[selectedLanguage]
    },
    {
      field: 'body', headerName: 'Body', flex: 12, sortable: false,
      renderCell: ({ row }: { row: BlogPostRow }) => row.body[selectedLanguage]
    },
    {
      field: 'vote', headerName: '', flex: 1, sortable: false,
      renderCell: ({ row }: { row: BlogPostRow }) =>
        <BlogPostVote
          row={row}
          onVote={(updatedRow: BlogPostRow) => {
            const updatedRows = filteredRows.map((row: BlogPostRow) => {
              if (row.id !== updatedRow.id) return row;
              return updatedRow;
            });

            setFilteredRows(updatedRows);
          }}
        />
    }
  ];

  const translatePosts = (language: BlogLanguage) => {
    const { page: currentPage, pageSize } = apiRef.current.state.pagination.paginationModel;
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedRows = filteredRows.slice(startIndex, endIndex);

    // If all displayed rows were already translated
    if (displayedRows.every(({ title }) => title[language])) {
      setSelectedLanguage(language);
      return;
    }

    // Extract all english text from displayed rows
    const displayedRowsTexts = displayedRows.reduce((acc: { text: string }[], { title, body }) => {
      return [
        ...acc,
        { 'text': title[BlogLanguage.English] },
        { 'text': body[BlogLanguage.English] }
      ]
    }, []);

    // Fetch translations
    const { v4: uuidv4 } = require('uuid');
    const key = '083f98b1ea1e49bcbadc13de4616d9a8'; // Security Vulnrability! should be in server
    const location = 'centralus';
    const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${BlogLanguage.English}&to=${language}`;

    // setLoadingTranslation(true);
    axios.post(
      endpoint,
      displayedRowsTexts,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Ocp-Apim-Subscription-Region': location,
          'Content-type': 'application/json',
          'X-ClientTraceId': uuidv4().toString()
        }
      })
      .then(res => {

        // Update displayed rows with translations
        const translatedRows: BlogPostRow[] = [];
        for (let i = 0; i < displayedRows.length; i++) {
          const translatedRow = {
            ...filteredRows[startIndex + i],
            title: {
              ...filteredRows[startIndex + i].title,
              [language]: res.data[i * 2].translations[0].text
            },
            body: {
              ...filteredRows[startIndex + i].body,
              [language]: res.data[(i * 2) + 1].translations[0].text
            }
          };

          const blogPostIndex = blogPostsRows.findIndex(({ id }) => id === translatedRow.id);
          blogPostsRows[blogPostIndex].title = translatedRow.title;
          blogPostsRows[blogPostIndex].body = translatedRow.body;
          translatedRows.push(translatedRow);
        }

        // Re-render
        const updatedRows = [
          ...filteredRows.slice(0, startIndex),
          ...translatedRows,
          ...filteredRows.slice(endIndex, filteredRows.length)
        ];

        // Update blog posts with translations or else filtering on translations won't work
        setBlogPostsRows(blogPostsRows);
        setFilteredRows(updatedRows);
        setSelectedLanguage(language);
      })
      .catch(error => {
        console.error('Error translating text:', error);
      })
  }

  return (
    <StyledBlogPostsFeed>
      <h1>Suridata Blog</h1>
      <div className='data-grid-toolbar'>
        <div className='quick-filter-container'>
          <TextField
            label="Quick Filter"
            value={quickFilter}
            onChange={handleQuickFilterChange}
          />
        </div>
        <div className='translations-container'>
          <FormControl fullWidth>
            <InputLabel id="language-select-label">Language</InputLabel>
            <Select
              labelId="language-select-label"
              id="language-select"
              value={selectedLanguage}
              label="Language"
              onChange={handleChange}
            >
              {languagesOptions.map(({ language, icon }) =>
                <MenuItem
                  key={language}
                  value={language}
                >
                  {icon}
                </MenuItem>
              )}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className='data-grid-container'>
        <DataGrid
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          disableColumnMenu
          onPaginationModelChange={() => translatePosts(selectedLanguage)}
          rows={filteredRows}
          columns={columns}
          apiRef={apiRef}
          sortModel={[]}
          loading={loading}
          initialState={initialState}
        />
      </div>
    </StyledBlogPostsFeed>
  );
}
