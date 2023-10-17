import { DataGrid, GridInitialState, useGridApiRef } from '@mui/x-data-grid';
import { BlogPostVote } from '../../components/Vote/BlogPostVote';
import { StyledBlogPostsFeed } from './blogPostsFeed.style';
import { FranceSvg, SpainSvg, USASvg } from '../../assets';
import { formatBlogPosts } from './blogPostsFeed.utils';
import { BlogPost, BlogPostRow } from '../../types';
import { BlogLanguage } from '../../enums';
import { TextField } from '@mui/material';
import debounce from 'lodash/debounce';
import React from 'react';
import axios from 'axios';


const data: BlogPost[] = [
  { id: '3623f638-bdb2-498a-a756-207efc71ba25', username: 'Edouard Falks', title: 'Marketing', body: 'Total tangible process improvement', date: '1/9/2023' },
  { id: 'b98db394-25a5-4334-965c-f42850d3760c', username: 'Clemens Guitte', title: 'Legal', body: 'Business-focused scalable initiative', date: '10/5/2022' },
  { id: '2e538032-1219-4a10-bc6c-290b438a54fb', username: 'Bernelle Benzi', title: 'Training', body: 'Virtual neutral installation', date: '2/5/2023' },
  { id: '1126d59c-dddd-47c5-884f-aa92fdfadf2e', username: 'Vincent Flaverty', title: 'Product Management', body: 'Balanced zero defect focus group', date: '12/4/2022' },
  { id: 'd66ae5c8-bbd7-497b-b7b1-445c94e7fbed', username: 'Florance Cabrara', title: 'Sales', body: 'Vision-oriented reciprocal definition', date: '7/6/2023' },
  { id: '1469829c-18d3-479c-814a-e58ae729723e', username: 'Calli Dutnall', title: 'Research and Development', body: 'Enhanced human-resource pricing structure', date: '9/23/2022' },
  { id: '66aaeac7-4cee-4eec-9a76-31ed63d6da6c', username: 'Eberto Olliar', title: 'Business Development', body: 'Open-source neutral projection', date: '9/9/2023' },
  { id: '416554d1-3b07-48e4-932e-664e1df2f2fa', username: 'Lacy Mutch', title: 'Support', body: 'Decentralized dedicated policy', date: '3/1/2023' },
  { id: '4e2dbab4-1528-4d3f-9429-bb2a9182398e', username: 'Lynnette Mayo', title: 'Sales', body: 'Reduced leading edge Graphic Interface', date: '3/19/2023' },
  { id: '0eab2902-b39d-45a1-b19b-7f03ee76217f', username: 'Any Tarling', title: 'Marketing', body: 'Pre-emptive discrete customer loyalty', date: '11/24/2022' },
  { id: '9048ac64-6e69-4f4e-95d0-3083bb2df881', username: 'Corenda Curtain', title: 'Human Resources', body: 'Operative reciprocal application', date: '12/31/2022' },
  { id: '3a58b0c5-e7a4-4885-887b-21e85ab336b7', username: 'Aldridge Chiverstone', title: 'Human Resources', body: 'Assimilated foreground strategy', date: '4/13/2023' },
  { id: '043f8a64-023a-4e0e-ae14-f721f5576f03', username: 'Lari Brittlebank', title: 'Sales', body: 'Virtual solution-oriented instruction set', date: '4/21/2023' },
  { id: '3c447aaa-d328-49e7-a358-82d4d7dc85a2', username: 'Rossie Domleo', title: 'Engineering', body: 'Organized national adapter', date: '5/12/2023' },
  { id: '061e8ca6-1a47-4c0c-bee8-ce9dd089cfc5', username: 'Oates Crowdace', title: 'Accounting', body: 'Quality-focused attitude-oriented adapter', date: '11/22/2022' },
  { id: '48c5477b-04ee-4417-9430-fa431d056239', username: 'Marta Stanex', title: 'Training', body: 'Intuitive object-oriented archive', date: '8/25/2023' },
  { id: '60851510-c92a-49fd-86f2-26db1682daef', username: 'Joey Sodo', title: 'Marketing', body: 'Quality-focused attitude-oriented workforce', date: '8/31/2023' },
  { id: 'bba3ba03-39e6-4c46-9152-ed10ce3a991d', username: 'Annetta Aronovitz', title: 'Services', body: 'Advanced multi-tasking utilisation', date: '11/2/2022' },
  { id: '3098a5da-7fec-49f5-bae2-890c697c73fc', username: 'Mirabella Leggs', title: 'Product Management', body: 'Visionary contextually-based budgetary management', date: '4/19/2023' },
  { id: 'ae52f966-47b5-4b9f-8cf6-b78178ea5ac5', username: 'Case Kimmins', title: 'Product Management', body: 'Multi-lateral fault-tolerant installation', date: '10/2/2022' },
  { id: 'dd751f0d-fddd-4d95-a7cc-af7ae0afd4b6', username: 'Mellisa Crosston', title: 'Business Development', body: 'Progressive stable core', date: '12/19/2022' },
  { id: '99824ace-d6f3-4d0b-9de3-4588ba796c83', username: 'Wilfred Guiel', title: 'Accounting', body: 'Multi-layered eco-centric database', date: '4/27/2023' },
  { id: '571b3b43-8834-45b0-ba6c-b08e2ff5b94b', username: 'Alaric Mayer', title: 'Sales', body: 'Multi-lateral modular array', date: '6/29/2023' },
  { id: '917ae678-d8f2-4d1b-8bd7-4a3494c665da', username: 'Lou Latimer', title: 'Research and Development', body: 'Vision-oriented 3rd generation service-desk', date: '1/20/2023' },
  { id: 'ba3422b0-6d50-4235-a43e-9e8bd281227c', username: 'Lewes Alvarado', title: 'Engineering', body: 'Managed interactive synergy', date: '11/27/2022' },
  { id: '0287501f-5288-4a84-bf9a-e343a6b9440b', username: 'Reed Sandbatch', title: 'Training', body: 'De-engineered didactic flexibility', date: '2/7/2023' },
  { id: '4f6a68c0-8d23-4222-8074-916344ec35cb', username: 'Moina Stanman', title: 'Services', body: 'Persevering 5th generation workforce', date: '7/29/2023' },
  { id: '5377ffae-436b-4354-9a58-153d9d5f5e17', username: 'Jeanette Dewes', title: 'Human Resources', body: 'Multi-layered actuating moderator', date: '9/14/2022' },
  { id: '16e90b50-4f4c-455c-8156-8fee85834869', username: 'Karyl Lathaye', title: 'Engineering', body: 'Advanced interactive capability', date: '8/5/2023' },
  { id: '6bab28a7-1aa0-4d74-abe0-1962aa025521', username: 'Letitia Wheelhouse', title: 'Accounting', body: 'Advanced didactic open architecture', date: '4/15/2023' },
  { id: '02dd6a2b-c8e8-4a4c-b385-d6aa620c14dc', username: 'Tami Priest', title: 'Research and Development', body: 'Digitized dedicated open system', date: '2/24/2023' },
  { id: 'ec18cc1c-c8ea-48a7-a2f4-5382ce35ad9b', username: 'Lamar Thorrold', title: 'Services', body: 'Proactive content-based local area network', date: '2/1/2023' },
  { id: '2eac5c88-6494-4ab3-b929-41a0adf2abec', username: 'Mureil Cloney', title: 'Support', body: 'Networked tangible framework', date: '3/16/2023' },
  { id: '51bcf30d-1e64-417a-b879-ea49f9f817b6', username: 'Calhoun Rozycki', title: 'Marketing', body: 'Down-sized zero administration support', date: '10/24/2022' },
  { id: '3c240871-f8d1-4718-ad9f-a18772ba883e', username: 'Jeni Poulsom', title: 'Services', body: 'Synergistic object-oriented moderator', date: '3/3/2023' },
  { id: 'cb6f0989-72f5-4103-9731-4b50b1a0dc96', username: 'Fonz Fenelon', title: 'Human Resources', body: 'Expanded empowering Graphical User Interface', date: '5/10/2023' },
  { id: '155ed5f8-d87b-4018-a621-5aee8605de70', username: 'Crichton Seagar', title: 'Research and Development', body: 'Down-sized context-sensitive implementation', date: '11/3/2022' },
  { id: 'dfcbbd53-2c22-48a4-a156-b68cf2962ce3', username: 'Carlene Treagus', title: 'Product Management', body: 'Focused user-facing challenge', date: '12/7/2022' },
  { id: '1302c272-68ed-48cd-86c8-d7a164bd2642', username: 'Christos Bartali', title: 'Services', body: 'Networked stable collaboration', date: '4/10/2023' },
  { id: 'f5289103-42ed-4005-bfdd-954397ab5e0e', username: 'Rod Tollett', title: 'Training', body: 'Robust static pricing structure', date: '9/11/2023' },
  { id: '68b7d977-2686-41be-998a-058ec8decf98', username: 'Tobie Gommey', title: 'Research and Development', body: 'Fundamental value-added firmware', date: '9/26/2022' }
]

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
  const [loadingTranslation, setLoadingTranslation] = React.useState<boolean>(false);
  // const [filteredRows, setFilteredRows] = React.useState<BlogPostRow[]>([]);
  // const [blogPosts, setBlogPosts] = React.useState<BlogPostRow[]>([]);
  const [blogPosts, setBlogPosts] = React.useState<BlogPostRow[]>(formatBlogPosts(data));
  const [filteredRows, setFilteredRows] = React.useState<BlogPostRow[]>(formatBlogPosts(data));
  const [loading, setLoading] = React.useState<boolean>(false);
  const [quickFilter, setQuickFilter] = React.useState('');
  const apiRef = useGridApiRef();

  // React.useEffect(() => {
  //   axios.get('https://my.api.mockaroo.com/posts', {
  //     headers: {
  //       'X-API-Key': '04d55c10',
  //       "Content-Type": 'application/json'
  //     }
  //   }).then(({ data }) => {
  //     const formattedData = formatBlogPosts(data);
  //     setBlogPosts(formattedData);
  //     setFilteredRows(formattedData);
  //     setLoading(false);
  //   }).catch(error => {
  //     console.error('Error fetching data:', error);
  //   });
  // }, [])

  const debouncedFilter = debounce((value) => {
    const filteredRows = blogPosts.filter((row) => {
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

  const handleLanguageClick = (language: BlogLanguage) => {
    if (language === selectedLanguage) {
      return;
    }

    translatePosts(language);
  }

  const translatePosts = (language: BlogLanguage) => {
    const { page: currentPage, pageSize } = apiRef.current.state.pagination.paginationModel;
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedRows = filteredRows.slice(startIndex, endIndex);

    // If page was already translated
    if (displayedRows[0].title[language]) {
      setSelectedLanguage(language);
      return;
    }

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

    setLoadingTranslation(true);
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

          const blogPostIndex = blogPosts.findIndex(({ id }) => id === translatedRow.id);
          blogPosts[blogPostIndex].title = translatedRow.title;
          blogPosts[blogPostIndex].body = translatedRow.body;
          translatedRows.push(translatedRow);
        }

        // Re-render
        const updatedRows = [
          ...filteredRows.slice(0, startIndex),
          ...translatedRows,
          ...filteredRows.slice(endIndex, filteredRows.length)
        ];

        setBlogPosts(blogPosts);
        setFilteredRows(updatedRows);
        setSelectedLanguage(language);
        setLoadingTranslation(false);
      })
      .catch(error => {
        console.error('Error translating text:', error);
        setLoadingTranslation(false);
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
          {languagesOptions.map(({ language, icon }) =>
            <div
              key={language}
              style={{
                border: selectedLanguage === language ? '2px solid #fff' : 'none',
                ...loadingTranslation ? {
                  pointerEvents: 'none',
                  opacity: '0.7',
                } : {
                  pointerEvents: 'auto',
                  opacity: '1',
                }
              }}
              onClick={() => handleLanguageClick(language)}>
              {icon}
            </div>
          )}
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
