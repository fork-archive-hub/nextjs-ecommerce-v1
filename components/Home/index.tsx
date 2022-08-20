const HomePageComingSoon = () => {
	return (
		<main className='w-full'>
			<div
				style={{
					// rgb(60, 56, 129, 0.9), rgb(141, 122, 59, 0.9)
					background:
						'linear-gradient(270deg, hsl(243deg 39% 18% / 90%), hsl(46deg 41% 20% / 90%)), url(./pexels-evgeniy-grozev-814830.jpg)',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
				}}
				className='flex w-full min-h-[100vh] flex-col justify-center items-center lg:flex-row'
			>
				<div
					className='
					w-full p-4 text-center flex flex-col justify-center items-center min-h-[50vh]
					lg:w-2/5
				'
				>
					<CustomNextImage
						src='./TREDA-GATE-02.png'
						alt=''
						className='w-[24rem] h-[12rem]'
						width={384}
						height={192}
						priority
					/>
					<h1 className='my-8 font-medium text-zinc-300'>
						We take Your Business To The Next Level
					</h1>
					<button
						className='border-2 border-zinc-300 text-zinc-300 font-bold rounded-full px-6 py-3 text-xl
						transition-all duration-75 ease-in hover:filter hover:brightness-75 focus:ring-4'
					>
						Coming Soon
					</button>
				</div>
				<div
					className='
						w-full text-center flex flex-col justify-center items-center max-w-full
						lg:w-3/5
					'
				>
					<div
						className='w-full flex justify-center items-center flex-wrap bg-half-white-transparent
						lg:flex-nowrap lg:bg-transparent'
					>
						{/* {[
							{
								img: { src: './pexels-diego-pontes-2323398.jpg', alt: '' },
								small: { text: 'Lorem ipsum' },
								headerText: 'Product 1',
								price: '$14.95',
								button: { text: 'Order Now' },
							},
							{
								img: { src: './pexels-diego-pontes-2323398.jpg', alt: '' },
								small: { text: 'Lorem ipsum' },
								headerText: 'Product 1',
								price: '$14.95',
								button: { text: 'Order Now' },
							},
							{
								img: { src: './pexels-diego-pontes-2323398.jpg', alt: '' },
								small: { text: 'Lorem ipsum' },
								headerText: 'Product 1',
								price: '$14.95',
								button: { text: 'Order Now' },
							},
						].map(({ img, small, headerText, price, button }, index, arr) => (
							<div
								key={index}
								className={`
								bg-zinc-100 p-4 flex flex-col justify-center items-start m-2 rounded-lg w-[30%] min-w-[10rem]
									lg:min-w-[12rem]
									md:min-w-[12rem]
								`}
							>
								<CustomNextImage
									className='w-full object-contain'
									src={img.src}
									alt={img.alt}
									width={400}
									height={250}
									priority
								/>
								<small className='my-1 text-slate-400'>{small.text}</small>
								<h2 className='my-1 text-black text-xl lg:text-3xl font-bold'>
									{headerText}
								</h2>
								<p className='my-1 text-slate-400 font-bold text-l lg:text-xl '>
									{price}
								</p>
								<button
									className='border-2 bg-black font-bold  px-4 py-2 rounded-3xl
									lg:rounded-full lg:text-lg
									transition-all duration-75 ease-in hover:filter hover:brightness-90 focus:ring-2'
								>
									{button.text}
								</button>
							</div>
						))} */}
						<div
							className='w-full
							max-h-[50rem]
							h-[45vh]'
							style={{
								// padding: '75% 0 0 0',
								position: 'relative',
								aspectRatio: '16/8',
								width: '100%',
								height: '100%',
							}}
						>
							<iframe
								src='https://player.vimeo.com/video/738307693?h=57579be359&amp;title=0&amp;byline=0&amp;portrait=0&amp;transparent=0&amp;player_id=0&amp;app_id=58479&amp;loop=true&amp;muted=true&amp;autoplay=1&amp;controls=0'
								//&amp;autoplay=1'
								// &amp;transparent=0'
								// &amp;title=0&amp;byline=0&amp;portrait=0'
								// &amp;background=1&amp;controls=0&amp;portrait=0' // badge=0&amp;
								frameBorder='0'
								allow='autoplay; fullscreen; loop;'
								allowFullScreen
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
								}}
								title='0b0f2dcb8e1544b81ecf172f0f4b6525.mp4'
							/>
							<Script
								src='https://player.vimeo.com/api/player.js'
								strategy='afterInteractive'
							/>
						</div>
					</div>
					<div className='my-4 px-2'>
						<h2 className='text-2xl font-bold text-zinc-300'>Treeda Gate</h2>
						<h2 className='text-2xl font-bold text-zinc-300'>
							The home for your Business
						</h2>
						<p className='m-4 font-medium text-zinc-300'>
							You can choose from over 400 business listing categories to find
							or add a business, No matter what type of business or service you
							are looking for, our directory will help you to easily locate a
							business near you.
						</p>
						<div>
							{/* <button
								className='max-w-[10rem]
									sm:max-w-[12rem]'
							>
								<a href='#'>
									<CustomNextImage
										className='max-w-full'
										src='./imgbin_app-store-android-google-play.png'
										alt=''
										width={160}
										height={192}
										priority
										style={{ transform: 'translateY(3px)' }}
									/>
								</a>
							</button>
							<span
								className='px-2
								sm:px-4'
							></span>
							<button
								className='max-w-[10rem]
									sm:max-w-[12rem]'
							>
								<a href='#'>
									<CustomNextImage
										className='max-w-full'
										src='http://wishah-alwatan.com/wp-content/uploads/2018/12/Marketing-Icons-with-Google-Play-Store-Download-Button-500x164-300x98.png'
										alt=''
										width={160}
										height={192}
										priority
									/>
								</a>
							</button> */}
							<p className='font-medium text-zinc-200'>
								For more information:
								<span className='px-1'></span>
								<a
									href='mailto:info@gate.thetreeda.com'
									className='transition-all duration-300 rounded text-sky-600 border-b border-b-sky-500 hover:border-b-transparent hover:text-sky-300 focus:ring-2 focus:ring-sky-800'
								>
									Info@gate.thetreeda.com
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

import CustomNextImage from '@components/common/CustomNextImage';
import CustomerLayout from '@components/layouts/Customer';
import { useSharedMainState } from '@components/layouts/Main/context';
import { useDynamicallyImportedGSAP } from '@components/layouts/Main/context/hooks';

import { IHomeProps } from '@pages/index';

import Head from 'next/head';
import Script from 'next/script';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import classes from './index.module.css';

const HomePage = ({ starredProductsInCollection1 }: IHomeProps) => {
	const [{ isMobileOrTablet }] = useSharedMainState();
	const [isHomePageComingSoonVisible, setIsHomePageComingSoonVisible] =
		useState(true);
	const { gsap } = useDynamicallyImportedGSAP();

	const neededProductsDataRef = useRef(
		(() => {
			const productsImages = starredProductsInCollection1.map(
				(product, productIndex, productsArr) => ({
					id: product.id,
					title: product.title,
					description: product.description,
					zIndex: productsArr.length - productIndex - 1,
					images: product.images.map(({ image }, imageIndex) => ({
						zIndex: imageIndex === 0 ? 1 : -1,
						id: image.id,
						src: image.src,
						alt: image.alt,
					})),
				})
			);

			return productsImages;
		})()
	);
	const neededProductsData = neededProductsDataRef.current;

	const gsapProductsImagesRef = useRef<HTMLDivElement>(null);
	const gsapProductDetailsRef = useRef<HTMLDivElement>(null);

	const neededProductsDataContainerRef = useRef<HTMLDivElement>(null);
	const productDetailsRef = useRef<HTMLDivElement>(null);

	const config = useRef({
		indexes: {
			currentProduct: 0,
			currentProductImage: 0,
		},
	});

	useEffect(() => {
		if (localStorage.getItem('showActualPage'))
			setIsHomePageComingSoonVisible(false);
	}, []);

	useEffect(() => {
		if (
			!gsapProductsImagesRef.current ||
			!gsapProductDetailsRef.current ||
			!gsap
		)
			return;

		const isBodyRTL = document.body.dir === 'rtl';
		const directionFixer = isBodyRTL ? -1 : 1;

		gsap.fromTo(
			gsapProductsImagesRef.current,
			{ x: `${directionFixer * -100}%`, opacity: 0 },
			{ x: 0, opacity: 1 }
		);

		gsap.fromTo(
			gsapProductDetailsRef.current,
			{ x: `${directionFixer * 100}%`, opacity: 0 },
			{ x: 0, opacity: 1 }
		);
	}, [gsap]);

	// if (isHomePageComingSoonVisible) return <HomePageComingSoon />;

	return (
		<CustomerLayout>
			<Head>
				<title>Shoppy</title>
				<meta name='description' content='Generated by create-t3-app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className='w-full p-4 md:p-8 flex justify-evenly items-center text-slate-100 bg-neutral-900 relative'>
				<div
					ref={gsapProductsImagesRef}
					className='
					gsap-products-images opacity-0
				absolute top-1/2 left-1/2 -translate-y-1/2 z-[1] max-w-[90%]
				// 
				lg:relative lg:top-auto lg:left-auto lg:-translate-x-0 lg:-translate-y-0
				-translate-x-1/2'
					// -translate-x-1/2
					// -translate-x-full
				>
					<div
						className='relative w-96 h-[36rem]'
						ref={neededProductsDataContainerRef}
					>
						{neededProductsData.map((product, productIndex, productArr) => (
							<div
								key={product.id}
								className={`absolute w-full h-full top-0 left-0 ${classes.heroProduct}`}
								// style={{ zIndex: product.zIndex }}
								style={
									{
										zIndex: product.zIndex,
										'--index': productIndex,
										'--arr-length': productArr.length,
									} as CSSProperties
								}
							>
								<div key={product.id} className='relative w-full h-full'>
									{product.images.map((image, imageIndex, imagesArr) => (
										<div
											key={image.src}
											className={`w-full h-full absolute top-0 left-0 flex items-center justify-center bg-neutral-800 ${classes.heroProductImgWrapper}`}
											// style={
											// 	{
											// 		zIndex: image.zIndex,
											// 		'--index': imageIndex,
											// 		'--arr-length': imagesArr.length,
											// 	} as CSSProperties
											// }
											style={{ zIndex: image.zIndex }}
										>
											<div className='relative w-full overflow-hidden'>
												<CustomNextImage
													src={image.src}
													alt={image.alt || ''}
													width={600}
													height={1200}
													className='object-contain w-full'
												/>
												<span
													className={`${classes.splashLine} ${
														(productIndex === 0 &&
															imageIndex === 0 &&
															classes.move) ||
														''
													}`}
													onAnimationEnd={() => {
														const containerElem =
															neededProductsDataContainerRef.current;
														const productDetailsElem =
															productDetailsRef.current;
														if (!containerElem || !productDetailsElem) return;

														const heroProducts = containerElem.querySelectorAll(
															`.${classes.heroProduct}`
														) as NodeListOf<HTMLDivElement>;

														let currentHeroProduct =
															heroProducts[
																config.current.indexes.currentProduct
															];
														let currHeroProductImgWrapper =
															currentHeroProduct.querySelectorAll(
																`.${classes.heroProductImgWrapper}`
															) as NodeListOf<HTMLDivElement>;

														if (
															!currHeroProductImgWrapper[
																config.current.indexes.currentProductImage + 1
															]
														) {
															currHeroProductImgWrapper[
																config.current.indexes.currentProductImage
															].style.zIndex = `${-1}`;
															currHeroProductImgWrapper[
																config.current.indexes.currentProductImage
															]
																.querySelector(`.${classes.splashLine}`)
																?.classList.remove(classes.move);
															currentHeroProduct.style.zIndex = `${-1}`;

															if (
																!heroProducts[
																	config.current.indexes.currentProduct + 1
																]
															) {
																config.current.indexes.currentProduct = 0;
															} else config.current.indexes.currentProduct++;

															currentHeroProduct =
																heroProducts[
																	config.current.indexes.currentProduct
																];

															currHeroProductImgWrapper =
																currentHeroProduct.querySelectorAll(
																	`.${classes.heroProductImgWrapper}`
																) as NodeListOf<HTMLDivElement>;

															(
																productDetailsElem.querySelector(
																	'.title'
																) as HTMLHeadingElement
															).innerText =
																neededProductsData[
																	config.current.indexes.currentProduct
																].title;
															(
																productDetailsElem.querySelector(
																	'.description'
																) as HTMLParagraphElement
															).innerText =
																neededProductsData[
																	config.current.indexes.currentProduct
																].description;

															currentHeroProduct.style.zIndex = `${1}`;
															config.current.indexes.currentProductImage = 0;
														} else {
															config.current.indexes.currentProductImage++;
														}

														currHeroProductImgWrapper[
															config.current.indexes.currentProductImage
														].style.zIndex = `${1}`;

														currHeroProductImgWrapper[
															config.current.indexes.currentProductImage
														]
															.querySelector(`.${classes.splashLine}`)
															?.classList.add(classes.move);
													}}
													onAnimationStart={() => {
														const containerElem =
															neededProductsDataContainerRef.current;
														if (!containerElem) return;

														const heroProducts = containerElem.querySelectorAll(
															`.${classes.heroProduct}`
														) as NodeListOf<HTMLDivElement>;

														const currentHeroProduct =
															heroProducts[
																config.current.indexes.currentProduct
															];
														const currHeroProductImgWrapper =
															currentHeroProduct.querySelectorAll(
																`.${classes.heroProductImgWrapper}`
															) as NodeListOf<HTMLDivElement>;

														const prevHeroProductImgWrapper =
															currHeroProductImgWrapper[
																config.current.indexes.currentProductImage - 1
															];
														if (prevHeroProductImgWrapper) {
															prevHeroProductImgWrapper.style.zIndex = `${-1}`;
															prevHeroProductImgWrapper
																.querySelector(`.${classes.splashLine}`)
																?.classList.remove(classes.move);
														}
													}}
												/>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
				<div
					ref={gsapProductDetailsRef}
					className={`
					gsap-product-details opacity-0
					w-full
					bg-75-transparent z-[2] p-8 rounded-lg max-h-[48rem] ${
						isMobileOrTablet
							? 'overflow-auto'
							: 'overflow-hidden hover:overflow-auto'
					}
					//
					md:w-5/6
					//
					lg:bg-neutral-800 lg:w-1/2
					`}
				>
					<h1 className='title text-4xl mb-4'>
						{neededProductsData[0]?.title}
					</h1>
					<p className='description'>{neededProductsData[0]?.description}</p>
				</div>
			</div>
		</CustomerLayout>
	);
};

export default HomePage;
