---
title: Codeforces Round 633 (Div. 1) 题解 (ABC)
date: 2020-04-13 08:05:00
permalink: /pages/b7eaac/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛链接](https://codeforces.com/contest/1338)

## A. Powered Addition

引理：正整数 $a$ 可以用 $k$ 秒变成 $[a,a+2^k-1]$ 内的任意一个数。

由于最后要变成不下降序列，因此我们只要取（每个元素最小填补量）的最大值 $S$，令大于 $S$ 的最小 2 的整数幂为 $2^k$，根据引理，答案就是 $k$ 了 qwq。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
int a[N];
int ans,n;
signed main(){
    int T; cin>>T;
    while(T--){
        cin>>n;
        repeat(i,0,n)cin>>a[i];
        int x=-inf;
        ans=0;
        repeat(i,0,n){
            if(a[i]<x)ans=max(ans,x-a[i]);
            x=max(x,a[i]);
        }
        int cnt=0;
        while(ans)ans>>=1,cnt++;
        cout<<cnt<<endl;
    }
    return 0;
}
```

## B. Edge Weight Assignment

有个小技巧，就是两个结点之间路径的 xor 和即这两个结点到根的路径 xor 和的 xor 和。

我们把某个度为 1 的结点当作根，好处就是不需要验证任意两个叶子的路径了，只要验证所有叶子到根的路径 xor 和是否为 0 即可（根据小技巧）（其实根不一定要度为 1，所以后面的论述根的度是否是 1 都会涉及）。

第一个子任务很简单，答案只能是 1 或者 3，分两种情况（看根的度是不是 1 了）。

如果根的度是 1，所有叶子的深度都是偶数，答案就是 1。

如果根的度不是 1，所有叶子的深度奇偶性相同，答案就是 1。

到了第二个子任务，一通操作猛如虎之后发现其实大多情况都能满足任意两个边权不相等，但是如果好多叶子连到一个结点上，这些边的边权被迫相等，只要减去即可。

另外，如果把度为 1 的结点当作根，由于这个结点本来就是叶子，还需要特判，反之就不需要特判。

我这里把度为 1 的结点当作根了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
//#define int ll
vector<int> a[N];
int rt,ans;
int deg[N],cnt[N],depth[N];
int flag=true;
void dfs(int x,int fa){
    for(auto p:a[x])
    if(p!=fa){
        depth[p]=depth[x]+1;
        dfs(p,x);
        cnt[x]+=deg[p]==1;
    }
    if(deg[x]==1 && depth[x]%2==1)flag=false;
    if(depth[x]==1)ans-=cnt[x];
    else ans-=max(cnt[x]-1,0);
}
signed main(){
    int n=read();
    repeat(i,0,n-1){
        int x=read()-1,y=read()-1;
        a[x].push_back(y); a[y].push_back(x);
        deg[x]++,deg[y]++;
    }
    repeat(i,0,n){
        if(deg[i]==1){rt=i; break;}
    }
    dfs(rt,-1);
    ans+=n-1;
    cout<<(flag?1:3)<<' '<<ans<<endl;
    return 0;
}
```

## C. Perfect Triples

我先列几个出来（二进制的）。

```cpp
1 10 11
100 1000 1100
101 1010 1111
110 1011 1101
111 1001 1110
10000 100000 110000
10001 100010 110011
10010 100011 110001
10011 100001 110010
10100 101010 111110
...
```

发现了什么？

没错，我将其称为 0231 定律（大雾），即如果第一列数确定了，可以通过如下方法得到第二列数：先化为 4 进制，然后 $[0,1,2,3]$ 对应地变成 $[0,2,3,1]$。

太完美了，要知道，第一列数非常有规律（好多连续的），第三列数由第一列 xor 第二列得到，~~如此水的题居然放 div1C 的位置，雾~~。

变量名实在难取，因此辣鸡代码警告。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
int ss[4]={0,2,3,1};
int f(int x){
    if(x==0)return 0;
    return f(x/4)*4+ss[x%4];
}
signed main(){
    int T=read();
    while(T--){
        int n=read()-1; if(n<3){cout<<n+1<<endl; continue;}
        int p=n/3;
        int x;
        for(x=1;p>=0;p-=x,x*=4);
        x/=4; p+=x;
        if(n%3==0){cout<<p+x<<endl; continue;}
        int t1=x+p;
        int t2=f(t1);
        if(n%3==1)cout<<t2<<endl;
        else cout<<(t1^t2)<<endl;
    }
    return 0;
}
```
