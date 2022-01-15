import React, {
  ChangeEvent,
  FC,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  CircularProgress,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { useObserver } from 'store/hooks';
import { queryLimit } from 'store/slices/article';
import NewsItem from '../NewsItem/NewsItem';
import styles from './NewsFeed.module.scss';
import { Article } from 'store/types/article.type';
import ArticleService from '@services/Article.service';
import SearchIcon from '@mui/icons-material/Search';
import PublicIcon from '@mui/icons-material/Public';
import PersonIcon from '@mui/icons-material/Person';
import { Fade } from 'react-awesome-reveal';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';

const newsFeedTabs = [
  { value: 'global', label: 'Global', icon: <PublicIcon /> },
  { value: 'personal', label: 'Personal', icon: <PersonIcon /> },
];

const NewsFeed: FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesCount, setArticlesCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // observer pagination params
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const lastElement = useRef<HTMLDivElement>(null);

  const handleArticlesLoading = () => {
    setOffset(offset + queryLimit);
  };

  useObserver(lastElement, hasMore, isLoaded, handleArticlesLoading);

  //search articles state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [activeTab, setActiveTab] = useState<string>(newsFeedTabs[0].value);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleIsSearchActive = () => {
    setIsSearchActive(!isSearchActive);
  };

  const onTabChange = (e: SyntheticEvent, val: string) => {
    setActiveTab(val);
  };

  const resetArticlesState = () => {
    setHasMore(false);
    setArticlesCount(0);
    setArticles([]);
  };

  const reloadArticlesFeed = () => {
    resetArticlesState();
    if (!offset) fetchArticles(offset);
    setOffset(0);
    setIsSearchActive(false);
  };

  const fetchArticles = async (offset: number) => {
    setIsLoaded(true);
    try {
      const { articles, articlesCount } = await ArticleService.findAll(
        offset,
        queryLimit
      );
      setArticles((state) => [...state, ...articles]);
      setArticlesCount(articlesCount);
      setIsLoaded(false);
    } catch (error) {
      setIsLoaded(false);
    }
  };

  const searchArticles = async (query: string) => {
    resetArticlesState();
    setIsLoaded(true);
    try {
      const { articles } = await ArticleService.search(query);
      setArticles(articles);
      setIsLoaded(false);
    } catch (error) {
      console.log(error);
      setIsLoaded(false);
    }
  };

  useEffect(() => {
    if (!searchQuery.length) return;

    if (timer) clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        await searchArticles(searchQuery);
      }, 500)
    );
  }, [searchQuery]);

  // increase articles capacity
  useEffect(() => {
    if (!articles) return;

    if (articles.length < articlesCount) {
      setHasMore(true);
    } else {
      setHasMore(false);
    }
  }, [articles.length, articlesCount]);

  useEffect(() => {
    fetchArticles(offset);
  }, [offset]);

  return (
    <div className={styles.feed__container} id='news'>
      <div className={styles.feed__actions}>
        <div>
          <Tabs value={activeTab} onChange={onTabChange}>
            {newsFeedTabs &&
              newsFeedTabs.map(({ icon, value }, index) => (
                <Tab
                  key={index}
                  value={value}
                  icon={icon}
                  className={styles.feed__actions__tab}
                />
              ))}
          </Tabs>
        </div>

        <div className={styles.feed__search}>
          {isSearchActive && (
            <Fade>
              <TextField onChange={onSearchChange} variant='standard' />
            </Fade>
          )}
          <IconButton
            onClick={isSearchActive ? reloadArticlesFeed : toggleIsSearchActive}
          >
            {isSearchActive ? <BackspaceOutlinedIcon /> : <SearchIcon />}
          </IconButton>
        </div>
      </div>

      <Grid>
        {articles &&
          articles.length > 0 &&
          articles.map((article) => (
            <NewsItem
              key={`${article.id}_${article.title}`}
              article={article}
            />
          ))}

        {!articles ||
          (articles.length === 0 && (
            <Fade>
              <Typography
                variant='h5'
                gutterBottom
                component='div'
                className={styles.feed__error}
              >
                News not found
                <ErrorOutlineIcon />
              </Typography>
            </Fade>
          ))}
      </Grid>

      <div
        ref={lastElement}
        style={{ display: !hasMore && 'none' }}
        className={styles.feed__loader}
      >
        <CircularProgress />
      </div>
    </div>
  );
};

export default NewsFeed;
