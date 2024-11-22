const Attribution = () => {
  return (
    <div className='text-center text-xs'>
      Power Stations dataset by
      <a
        className='hover:underline'
        href='https://datasets.wri.org/'
        rel='nofollow noopener noreferrer'
        target='_blank'
      >
        WRI
      </a>
      . | We use the{' '}
      <a
        className='hover:underline'
        href='https://www.geonames.org/'
        rel='nofollow noopener noreferrer'
        target='_blank'
      >
        GeoNames
      </a>{' '}
      services under the{' '}
      <a
        className='hover:underline'
        href='https://creativecommons.org/licenses/by/4.0/'
        rel='nofollow noopener noreferrer'
        target='_blank'
      >
        Creative Commons License
      </a>
      .
    </div>
  );
};

export default Attribution;