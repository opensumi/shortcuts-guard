import React from 'react';
import ReactDOM from 'react-dom';

import { Button } from '@opensumi/ide-components/lib/button';
import { Input } from '@opensumi/ide-components/lib/input';
import { message } from '@opensumi/ide-components/lib/message';
import { RecycleList } from '@opensumi/ide-components/lib/recycle-list';

import styles from './popup.module.less';
import { Tooltip } from '@opensumi/ide-components/lib/tooltip';

const Popup = () => {
  const [urls, setUrls] = React.useState<string[]>([]);
  const [addingUrl, setAddingUrl] = React.useState('');

  const handleChangeAddInput = (value: string) => {
    setAddingUrl(value);
  };

  const handleClickDeleteUrlButton = (targetUrl: string) => {
    message.success(chrome.i18n.getMessage('successfullyDelete'), 3);
    const newUrls = urls.filter((url) => url !== targetUrl);
    setUrls(newUrls);
    updateUrlsInChromeStorage(newUrls);
  };

  const handleClickGoToRepo = () => {
    chrome.tabs.create({ url: 'https://github.com/opensumi/shortcuts-guard' });
  };

  const handlePressAddUrlEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      handleAddUrl();
    }
  };

  const handleAddUrl = () => {
    if (addingUrl) {
      const trimedAddingNewUrl = addingUrl.trim();
      if (urls.some((url) => url === trimedAddingNewUrl)) {
        message.error(chrome.i18n.getMessage('addFailExist'), 3);
      } else {
        const newUrl = trimedAddingNewUrl;
        message.success(chrome.i18n.getMessage('successfullyAdd'), 3);
        setAddingUrl('');
        updateUrlsInChromeStorage([newUrl, ...urls]);
        setUrls([newUrl, ...urls]);
      }
    } else {
      message.error(chrome.i18n.getMessage('addFailEmpty'), 3);
    }
  };

  const updateUrlsInChromeStorage = (newUrls: string[]) => {
    chrome.storage.sync.set({ urls: newUrls });
  };

  React.useEffect(() => {
    (async () => {
      const item = await chrome.storage.sync.get('urls');
      if (item.urls) {
        setUrls(item.urls);
      }
    })();
  }, []);

  const ListItemTemplate = ({
    data,
    index,
  }: {
    data: string;
    index: number;
  }) => {
    const [editingUrl, setEditingUrl] = React.useState(data);

    const handlePressEditUrlEnter = (
      event: React.KeyboardEvent<HTMLInputElement>,
      index: number,
    ) => {
      if (event.key === 'Enter') {
        handleEditUrl(index);
      }
    };

    const handleBlurEditInput = () => {
      setEditingUrl(data);
    };

    const handleChangeEditInput = (value: string) => {
      setEditingUrl(value);
    };

    const handleClickCancelButton = () => {
      setEditingUrl(data);
    };

    const handleClickOkButton = () => {
      handleEditUrl(index);
    };

    const handleEditUrl = (index: number) => {
      if (editingUrl) {
        const trimedEditingNewUrl = editingUrl.trim();
        if (
          urls.some((url, idx) => url === trimedEditingNewUrl && idx !== index)
        ) {
          message.error(chrome.i18n.getMessage('updateFailExist'), 3);
        } else {
          const newUrl = trimedEditingNewUrl;
          message.success(chrome.i18n.getMessage('successfullyUpdate'), 3);
          const newUrls = urls
            .slice(0, index)
            .concat(newUrl, urls.slice(index + 1));
          updateUrlsInChromeStorage(newUrls);
          setUrls(newUrls);
        }
      } else {
        message.error(chrome.i18n.getMessage('updateFailEmpty'), 3);
      }
    };

    const deleteButton = (
      <Tooltip title={chrome.i18n.getMessage('delete')} delay={600}>
        <Button
          type="icon"
          icon="delete"
          style={{ color: 'red' }}
          onClick={() => handleClickDeleteUrlButton(data)}
        />
      </Tooltip>
    );

    const cancelButton = (
      <Tooltip title={chrome.i18n.getMessage('cancel')} delay={600}>
        <Button
          type="icon"
          icon="close"
          style={{ color: 'grey' }}
          onClick={handleClickCancelButton}
        />
      </Tooltip>
    );

    const okButton = (
      <Tooltip title={chrome.i18n.getMessage('ok')} delay={600}>
        <Button
          type="icon"
          icon="check"
          style={{ color: 'blue' }}
          onClick={handleClickOkButton}
        />
      </Tooltip>
    );

    return (
      <div key={index} className={styles.item} style={{ position: 'relative' }}>
        <Input
          value={editingUrl}
          addonAfter={
            editingUrl === data ? deleteButton : [cancelButton, okButton]
          }
          onBlur={handleBlurEditInput}
          onValueChange={handleChangeEditInput}
          onPressEnter={(event) => handlePressEditUrlEnter(event, index)}
        />
      </div>
    );
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles['left-wrapper']}>
          <img
            src="../images/logo.svg"
            className={styles.logo}
            onClick={handleClickGoToRepo}
          />
          <div className={styles['vertical-divider']} />
          <span
            className={styles['sumi-name']}
            onClick={handleClickGoToRepo}
          >
            OpenSumi Guard
          </span>
        </div>
        <Tooltip title={chrome.i18n.getMessage('goShortcut')} delay={600}>
          <Button
            type="icon"
            icon="keyboard"
            className={styles.icon}
            onClick={() =>
              chrome.tabs.create({ url: 'chrome://extensions/shortcuts' })
            }
          />
        </Tooltip>
      </div>
      <div className={styles['add-url-section']}>
        <Input
          className={styles.input}
          placeholder={chrome.i18n.getMessage('supportRegular')}
          value={addingUrl}
          onValueChange={handleChangeAddInput}
          onPressEnter={handlePressAddUrlEnter}
        />
        <Button type="primary" size="large" onClick={handleAddUrl}>
          {chrome.i18n.getMessage('add')}
        </Button>
      </div>
      <RecycleList
        data={urls}
        itemHeight={40}
        template={ListItemTemplate}
        className={styles['url-list']}
        style={{
          fontSize: '16px',
          height: '160px',
          width: 'calc(100vw - 15px)',
          willChange: 'initial',
          transform: 'none',
        }}
      />
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
  document.getElementById('root'),
);
