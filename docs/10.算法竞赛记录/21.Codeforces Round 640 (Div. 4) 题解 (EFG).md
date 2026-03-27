---
title: Codeforces Round 640 (Div. 4) 题解 (EFG)
date: 2020-05-10 08:36:00
permalink: /pages/c97892/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

<https://codeforces.com/contest/1352>

本题解 $+$ 熔岩 $=$ 黑曜石。

## E. Special Elements

一看 $n=8000$，就搞个 $O(n^2)$ 水过吧。

先记录 $cnt[i]=(\ i$ 在数列 $a$ 中的出现次数 $)$，然后遍历所有长度大于等于 2 的区间和 $sum=\sum\limits_{i=l}^r a[i]$，与其对应的 special elements 个数就是 $cnt[sum]$。当然访问过 $cnt[sum]$ 就后把 $cnt[sum]$ 清空，避免重复记录。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=8010; typedef long long ll;
int T,n;
int a[N],cnt[N];
signed main(){
    cin>>T;
    while(T--){
        cin>>n;
        fill(cnt,cnt+n+2,0);
        int ans=0;
        repeat(i,0,n){
            cin>>a[i];
            cnt[a[i]]++;
        }
        repeat(len,2,n+1){
            int sum=0;
            repeat(i,0,len-1)sum+=a[i];
            repeat(i,len-1,n){
                sum+=a[i];
                if(sum<=n){ans+=cnt[sum]; cnt[sum]=0;}
                sum-=a[i-len+1];
            }
        }
        cout<<ans<<endl;
    }
    return 0;
}
```

## F. Binary String Reconstruction

构造题，只要一开始全是 0，然后全是 1，最后在 01 之间反复横跳即可。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=8010; typedef long long ll;
int T,n0,n1,n2;
signed main(){
    cin>>T;
    while(T--){
        cin>>n0>>n1>>n2;
        if(n1==0){
            if(n0>0)repeat(i,0,n0+1)cout<<'0';
            if(n2>0)repeat(i,0,n2+1)cout<<'1'; //这里n0和n2不可能同时大于0
            cout<<endl;
            continue;
        }
        repeat(i,0,n0+1)cout<<'0';
        repeat(i,0,n2+1)cout<<'1';
        repeat(i,0,n1-1)cout<<char('0'+i%2);
        cout<<endl;
    }
    return 0;
}
```

## G. Special Permutation

叕是构造题，只要倒着输出所有奇数，然后正着输出所有偶数（2 和 4 位置反一下）即可。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=8010; typedef long long ll;
int T,n;
signed main(){
    cin>>T;
    while(T--){
        cin>>n;
        if(n>=4){
            repeat_back(i,1,n+1)if(i%2==1)cout<<i<<' ';
            cout<<"4 2 ";
            repeat(i,5,n+1)if(i%2==0)cout<<i<<' ';
        }
        else cout<<-1;
        cout<<endl;
    }
    return 0;
}
```
