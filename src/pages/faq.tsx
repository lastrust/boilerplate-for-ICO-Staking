import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { NextPageWithLayout } from '@/types';
import MinimalLayout from '@/layouts/_minimal';
import { ChevronDownIcon } from '@/components/icons/chevron-down';
import { motion, AnimatePresence } from 'framer-motion';
import { FAQData } from '@/data/FAQ';

const FAQPage: NextPageWithLayout = () => {
  const [showIndex, setShowIndex] = useState(0);
  const [isExpand, setIsExpand] = useState(false);
  const updateExpand = (index: number) => {
    if (index != showIndex && isExpand) {
      setShowIndex(index);
    } else {
      setShowIndex(index);
      setIsExpand(!isExpand);
    }
  };
  return (
    <>
      <NextSeo title="Bunzz - FAQ" description="Bunzz - FAQ" />
      <section className="px-10 pt-7 pb-5">
        <div className="text-center">
          <h2 className="text-5xl">Frequently Asked Questions</h2>
        </div>
        <div className="mx-auto mt-10 max-w-[1120px] rounded-lg border border-solid border-gray-200 bg-body shadow dark:border-gray-700 dark:bg-dark">
          {FAQData.map((item, index) => {
            return (
              <>
                <div className=" ">
                  <div
                    className="flex h-16 w-full cursor-pointer items-center justify-between border-t border-solid border-solid border-gray-200 p-6 p-4 dark:border-gray-700 sm:p-6"
                    onClick={() => updateExpand(index)}
                  >
                    {item.question}
                    <span className="flex items-center text-sm text-gray-500 dark:text-gray-300">
                      <ChevronDownIcon
                        className={`transition-all ltr:ml-1.5 rtl:mr-1.5 ${
                          isExpand && showIndex == index
                            ? 'rotate-180'
                            : 'rotate-0'
                        }`}
                      />
                    </span>
                  </div>
                  <AnimatePresence initial={false}>
                    {isExpand && showIndex == index && (
                      <motion.div
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: 'auto' },
                          collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                      >
                        <div className="border-t border-solid border-gray-200 p-4 dark:border-gray-700 sm:p-6">
                          <div className="flex flex-col gap-3 xs:gap-[18px]">
                            {item.answer}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

FAQPage.getLayout = function getLayout(page) {
  return <MinimalLayout>{page}</MinimalLayout>;
};

export default FAQPage;
