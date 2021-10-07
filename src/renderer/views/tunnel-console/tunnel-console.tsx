import React, { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../state/hooks";
import BaseView from "../base-view";
import TabContent from "./tab-content";
import { StatusOnlineIcon } from "@heroicons/react/solid";

export default function TunnelConsole() {
  const location = useLocation<{
    activeId: string;
  }>();
  const activeTunnels = useAppSelector(
    (state) => state.tunnelConfig.activeTunnels
  );
  const [activeTab, setActiveTab] = useState(
    location.state?.activeId ?? activeTunnels[0]?.tunnel.id
  );
  const activeTunnel = useMemo(
    () => activeTunnels.find((x) => x.tunnel.id === activeTab),
    [activeTunnels, activeTab]
  );

  const tabs = useMemo(() => {
    if (activeTunnels.length > 0) {
      const selectedId = activeTab || activeTunnels[0].tunnel.id;
      return activeTunnels.map((spawn) => (
        <li
          id={spawn.tunnel.id}
          onClick={(event: React.MouseEvent<HTMLLIElement>) =>
            setActiveTab(event.currentTarget.id)
          }
          className={`bg-gray-100 px-4 border-gray-300 rounded-t-lg
		  text-xs font-semibold text-gray-600 uppercase tracking-wider py-2 mb-px cursor-pointer ${
        selectedId === spawn.tunnel.id
          ? "border-t border-l border-r border-b-0 -mb-px "
          : ""
      }`}
        >
          <div>
            <span>
              {spawn.tunnel.title}
              <StatusOnlineIcon
                className={`ml-2 inline animate-pulse h-4 w-4 align-top ${
                  spawn.messages.some((x) => x.isError)
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              />
            </span>
          </div>
        </li>
      ));
    } else {
      return [];
    }
  }, [activeTunnels, activeTab]);

  const tabList = (
    <ul
      id="tabs"
      className="inline-flex pt-2 px-1 w-full border-b border-gray-300"
    >
      {...tabs}
    </ul>
  );
  console.log(activeTunnel);
  console.log(activeTab);
  return (
    <BaseView title="Tunnel Console">
      {activeTunnels.length ? (
        <div className="border-gray-300 w-full border rounded mx-auto mt-4 bg-gray-100">
          {tabList}
          {!!activeTunnel && <TabContent tunnel={activeTunnel} />}
        </div>
      ) : (
        <div className="flex flex-col mt-16">
          <h4 className="py-10 m-auto bg-gray-600 w-1/2 uppercase tracking-wider text-center">
            <span className="text-gray-200 p-3">
              No Active Tunnels Available
            </span>
          </h4>
        </div>
      )}
    </BaseView>
  );
}
